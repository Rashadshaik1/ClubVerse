const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.send("Auth route working");
});

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/me", protect, getMe);

module.exports = router;