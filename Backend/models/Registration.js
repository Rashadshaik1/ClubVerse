const mongoose = require("mongoose");

// Registration schema = who registered for which event
const regSchema = new mongoose.Schema({

  // Logged-in user id
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // Event id
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }

}, { timestamps: true });

module.exports = mongoose.model("Registration", regSchema);