import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/sendEmail.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if user still exists or not
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User Already Exist" });

    // Validating Email format and strong password
    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Enter a valid Email" });
    if (password.length < 8)
      return res.json({
        success: false,
        message: "Password length should be greater than 8 digit",
      });

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOtp();

    // Creating new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // 5 min
    });

    // Saving user to database
    await newUser.save();

    await transporter.sendMail({
      from: process.env.email,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes`,
    });
    res.json({ success: true, message: "OTP sent to email. Please Verify" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.isVerified)
      return res.json({ success: false, message: "User already verified" });
    if (user.otp != Number(otp))
      return res.json({ success: false, message: "Invalid OTP" });
    if (user.otpExpires < Date.now())
      return res.json({ success: false, message: "OTP Expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    const token = createToken(user._id);
    res.json({ success: true, message: "Email Verified Successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User does not exist" });
    if (!user.isVerified)
      return res.json({ success: false, message: "Please verify your email" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, verifyOtp };
