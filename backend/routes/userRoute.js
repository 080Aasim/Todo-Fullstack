import express from "express";
import { registerUser, loginUser, verifyOtp } from "../controllers/userController.js";

const userRouter = express.Router();

// Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-otp", verifyOtp)

export default userRouter;
