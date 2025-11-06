import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/send", sendOtp);      // Body: { "email": "user@example.com" }
router.post("/verify", verifyOtp);  // Body: { "email":"user@example.com", "otp":"123456" }

export default router;
