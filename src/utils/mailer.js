import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,            // or true depending on your SMTP
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: `"CommerceSense" <${process.env.SMTP_USER}>`,
    to: to,
    subject: "Your OTP Code for Email Verification",
    html: `<p>Your verification code is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);
};
