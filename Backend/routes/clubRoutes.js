const express = require("express");
const router = express.Router();

// middleware
const { protect } = require("../middlewares/authMiddleware");

// controller
const {
  getClubs,
  getClubById,
  loginClub,
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/clubController");

// ================= LOGIN CLUB =================
router.post("/login", loginClub);

// ================= CLUB PROFILE (Moved above /:id to prevent route collision) =================
router.get("/profile", protect, getProfile);

// ================= UPDATE PROFILE =================
router.put("/profile", protect, updateProfile);

// ================= CHANGE PASSWORD =================
router.put("/change-password", protect, changePassword);

// ================= GET ALL CLUBS =================
router.get("/", getClubs);

// ================= GET SINGLE CLUB =================
router.get("/:id", getClubById);

module.exports = router;