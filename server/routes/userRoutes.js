import express from "express";
import { login , logout , getUser, updateUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/:id").get(getUser).put(isAuthenticated , updateUser);

export default router;
