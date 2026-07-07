const express = require("express");
const router = express.Router();

// middleware
const { protect } = require("../middlewares/authMiddleware");

// controller
const {
  getClubs,
  loginClub,
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/clubController");

// ================= LOGIN CLUB =================
router.post("/login", loginClub);

// ================= GET ALL CLUBS =================
router.get("/", getClubs);

// ================= CLUB PROFILE =================
router.get("/profile", protect, getProfile);

// ================= UPDATE PROFILE =================
router.put("/profile", protect, updateProfile);

// ================= CHANGE PASSWORD =================
router.put("/change-password", protect, changePassword);

module.exports = router;