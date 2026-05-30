const express = require("express");
const router = express.Router();

const { register, login, getMe, guestLogin } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// test route
router.get("/", (req, res) => {
  res.send("Auth route working");
});

// auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/guest", guestLogin);

// protected route
router.get("/me", protect, getMe);

module.exports = router;