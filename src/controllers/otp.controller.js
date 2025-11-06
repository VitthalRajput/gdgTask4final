import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { sendOTPEmail } from "../utils/mailer.js";

// helper to generate numeric OTP
const generateOtp = () => Math.floor(100000 + Math.random()*900000).toString();

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // optionally check if user exists or not verified yet
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email already verified" });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await OTP.create({ email, otp, expiresAt });

    await sendOTPEmail(email, otp);

    return res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in sendOtp:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP both required" });
    }

    const otpRecord = await OTP.findOne({ email, otp, expiresAt: { $gte: new Date() } });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // mark user as verified
    await User.updateOne({ email }, { $set: { isVerified: true } });

    // delete OTPs for this email
    await OTP.deleteMany({ email });

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
