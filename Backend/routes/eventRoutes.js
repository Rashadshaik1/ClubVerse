const express = require("express");
const router = express.Router();

// JWT middleware
const { protect } = require("../middlewares/authMiddleware");

// Controller functions
const {
  createEvent,
  getEvents,
  getEventById
} = require("../controllers/eventController");


// POST → create event (login required)
router.post("/", protect, createEvent);


// GET → fetch all events
router.get("/", getEvents);


// GET → fetch single event
router.get("/:id", getEventById);


// export router
module.exports = router;