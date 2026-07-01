const express = require("express");
const router = express.Router();

// middleware
const { protect } = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");

// controller functions
const {
  createClubAccount,
  getAllUsers,
  getAllClubs,
  getAllEvents,
  createAdmin,
  deleteClub,
  blockClub,
  getEventsByClub
} = require("../controllers/adminController");


// ================= CREATE ADMIN =================
router.post("/create-admin", createAdmin);

// ================= CREATE CLUB =================
router.post("/create-club", protect, adminOnly, createClubAccount);

// ================= GET USERS =================
router.get("/users", protect, adminOnly, getAllUsers);

// ================= GET EVENTS (ALL) =================
router.get("/events", protect, adminOnly, getAllEvents);

// ================= GET EVENTS BY CLUB (🔥 NEW FOR ANALYTICS) =================
router.get("/events/:clubId", protect, adminOnly, getEventsByClub);

// ================= GET CLUBS =================
router.get("/clubs", protect, adminOnly, getAllClubs);


// ================= DELETE CLUB =================
router.delete("/club/:id", protect, adminOnly, deleteClub);

// ================= BLOCK / UNBLOCK CLUB =================
router.put("/block-club/:id", protect, adminOnly, blockClub);

module.exports = router;