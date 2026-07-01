const express = require("express");
const router = express.Router();

// middleware
const { protect } = require("../middlewares/authMiddleware");

// controller
const {
  getClubs,
  loginClub
} = require("../controllers/clubController");

// ================= LOGIN CLUB =================
router.post("/login", loginClub);



// ================= GET CLUBS =================
router.get("/", getClubs);

module.exports = router;