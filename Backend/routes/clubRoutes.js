const express = require("express");
const router = express.Router();

// import middleware
const { protect } = require("../middlewares/authMiddleware");

// import controller functions
const { createClub, getClubs } = require("../controllers/clubController");


// POST → create club (only logged-in users)
router.post("/", protect, createClub);


// GET → fetch all clubs (no login needed)
router.get("/", getClubs);


// export routes
module.exports = router;