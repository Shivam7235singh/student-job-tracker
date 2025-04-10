import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      // Auto-register the user if not found
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "User not found. Please provide 'name' to create a new account.",
        });
      }

      // Create user without hashing the password
      user = await User.create({ name, email, password });
    } else {
      // Check if the password matches
      if (user.password !== password) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000), // 10 minutes
        httpOnly: true,
      })
      .json({
        success: true,
        message: user.isNew ? "User created and logged in" : "Logged In Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    // Fetch the logged-in user by their ID
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    // Ensure the user can only update their own data
    if (req.user._id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this user",
      });
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
