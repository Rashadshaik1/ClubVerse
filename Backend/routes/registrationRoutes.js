const express = require("express");
const router = express.Router();

// middleware
const { protect }= require("../middlewares/authMiddleware");

// controller
const {
  registerEvent,
  getMyRegs
} = require("../controllers/registrationController");


// POST → register for event
router.post("/", protect, registerEvent);


// GET → my registrations
router.get("/", protect, getMyRegs);


module.exports = router;