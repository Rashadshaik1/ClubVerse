const mongoose = require("mongoose");

const regSchema = new mongoose.Schema(
  {
    // Logged-in user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Event
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // Mobile number entered during registration
    mobile: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registration for same user + event
regSchema.index(
  { userId: 1, eventId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Registration", regSchema);