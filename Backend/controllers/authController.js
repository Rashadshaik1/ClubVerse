const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const allowedDomain = "@gvpce.ac.in";

// ===================== REGISTER =====================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email.endsWith(allowedDomain)) {
      return res.status(400).json({ msg: "Only GVPCE email allowed" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// ===================== LOGIN =====================
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
      { id: user._id, role: user.role || "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "student"
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// ===================== GET CURRENT USER =====================
exports.getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// ===================== GUEST LOGIN =====================
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
        role: "guest"
      }
    });

  } catch (error) {
    console.error("Guest Error:", error);
    res.status(500).json({ error: error.message });
  }
};