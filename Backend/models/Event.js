const mongoose = require("mongoose");

// Event schema = event structure in DB
const eventSchema = new mongoose.Schema({

  // Event title (ex: Hackathon)
  title: {
    type: String,
    required: true
  },

  // Event description
  description: {
    type: String,
    required: true
  },

  // Event date
  date: {
    type: Date,
    required: true
  },

  // Event venue (place where event happens)
  venue: {
    type: String,
    required: true
  },

  // Reference to club (which club created this event)
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club"
  }

}, { timestamps: true });

// Export model
module.exports = mongoose.model("Event", eventSchema);