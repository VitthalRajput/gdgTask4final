import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
import OTP from "../models/otp.model.js"; // Create this model
import nodemailer from "nodemailer";

// ✅ Setup mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ REGISTER USER (isVerified = false)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, isVerified: false });

    // Send OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email, otp: otpCode, createdAt: new Date() });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify your email",
      text: `Your OTP code is ${otpCode}`,
    });

    res.status(201).json({ message: "Registered successfully. Please verify your email via OTP." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await OTP.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    await User.updateOne({ email }, { $set: { isVerified: true } });
    await OTP.deleteMany({ email });

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ LOGIN (only verified users)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email first" });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
