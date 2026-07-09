const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const allowedDomain = "@gvpce.ac.in";
const  getStudentDetails  = require("../utils/studentDetails");
// ================= TEMP OTP STORE =================
const otpStore = {};

// ===================== SEND OTP (NEW ADDITION) =====================
exports.sendRegisterOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email.endsWith(allowedDomain)) {
      return res.status(400).json({ msg: "Only GVPCE email allowed" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore[email] = {
      otp,
      name,
      email,
      password,
      expires: Date.now() + 5 * 60 * 1000
    };

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL.trim(),
    pass: process.env.EMAIL_PASS.replace(/\s/g, "")
  }
});

await transporter.verify();
console.log("✅ Gmail Connected Successfully");

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "ClubVerse OTP Verification",
      text: `Your OTP is: ${otp}`
    });

    res.json({ msg: "OTP sent to email" });

  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ===================== VERIFY OTP + REGISTER =====================
exports.verifyOtpRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore[email];

    if (!record) {
      return res.status(400).json({ msg: "OTP not found" });
    }

    if (record.expires < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(record.password, 10);

// Get student details from email
const studentDetails = getStudentDetails(record.email);

const user = await User.create({
  name: record.name,
  email: record.email,
  password: hashedPassword,

  rollNumber: studentDetails.rollNumber,
  department: studentDetails.department,
  year: studentDetails.year,

  mobile: "",
  profilePhoto: "",
  registeredEvents: []
});

    delete otpStore[email];

    res.status(201).json({
      success: true,
      user: {
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role || "student",

  rollNumber: user.rollNumber,
  department: user.department,
  year: user.year,
  mobile: user.mobile,
  profilePhoto: user.profilePhoto,
  registeredEvents: user.registeredEvents
}
    });

  } catch (error) {
    console.error("OTP Verify Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ===================== RESEND OTP =====================
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email.endsWith(allowedDomain)) {
      return res.status(400).json({ msg: "Only GVPCE email allowed" });
    }

    const record = otpStore[email];

    if (!record) {
      return res.status(400).json({
        msg: "Registration session expired. Please register again."
      });
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Update OTP and expiry only
    otpStore[email].otp = otp;
    otpStore[email].expires = Date.now() + 5 * 60 * 1000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "ClubVerse OTP Verification",
      text: `Your new ClubVerse OTP is: ${otp}`
    });

    res.json({
      success: true,
      msg: "OTP resent successfully"
    });

  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({
      error: error.message
    });
  }
};

// ===================== LOGIN (UNCHANGED) =====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.endsWith(allowedDomain)) {
      return res.status(400).json({ msg: "Use your GVPCE email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role || "student",
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
     user: {
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role || "student",

  rollNumber: user.rollNumber,
  department: user.department,
  year: user.year,
  mobile: user.mobile,
  profilePhoto: user.profilePhoto,
  registeredEvents: user.registeredEvents
}
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ===================== GET ME (UNCHANGED) =====================
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===================== GUEST LOGIN (UNCHANGED) =====================
exports.guestLogin = (req, res) => {
  try {
    const token = jwt.sign(
      { role: "guest" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        name: "Guest",
        email: "guest@local",
        role: "guest"
      }
    });

  } catch (error) {
    console.error("Guest Error:", error);
    res.status(500).json({ error: error.message });
  }
};