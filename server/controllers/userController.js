import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required' });

  let user = await User.findOne({ email });

  if (!user) {
    if (!name) {
      return res.status(400).json({ success: false, message: 'User not found. Provide name to register.' });
    }

    user = await User.create({ name, email, password });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 1000 * 60 * 60,
      })
      .json({ success: true, message: 'New user created & logged in', user });
  }

  if (user.password !== password)
    return res.status(400).json({ success: false, message: 'Invalid password' });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(200)
    .cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60,
    })
    .json({ success: true, message: 'Login successful', user });
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving user data' });
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ success: true, message: 'Logged out successfully' });
};
