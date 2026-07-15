const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  guestLogin,
  sendRegisterOtp,
  verifyOtpRegister,
  resendOtp,
  sendForgotPasswordOtp,
  resetPassword
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

// test route
router.get("/", (req, res) => {
  res.send("Auth route working");
});

// ================= OTP REGISTER FLOW =================
router.post("/register-send-otp", sendRegisterOtp);
router.post("/verify-otp-register", verifyOtpRegister);
router.post("/resend-otp", resendOtp);

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", sendForgotPasswordOtp);
router.post("/reset-password", resetPassword);

// ================= LOGIN =================
router.post("/login", login);

// ================= GUEST =================
router.post("/guest", guestLogin);

// ================= PROTECTED =================
router.get("/me", protect, getMe);

module.exports = router;