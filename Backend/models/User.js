const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ================= BASIC DETAILS =================

    // User Name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Password (Hashed)
    password: {
      type: String,
      required: true
    },

    // ================= STUDENT DETAILS =================

    // Roll Number
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // Department
    department: {
      type: String,
      default: ""
    },

    // Year
    year: {
      type: String,
      default: ""
    },

    // Mobile Number
    mobile: {
      type: String,
      default: ""
    },

    // Profile Photo
    profilePhoto: {
      type: String,
      default: ""
    },

    // Registered Events
    registeredEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }
    ],

    // ================= USER ROLE =================

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },

    // ================= STATUS FLAGS =================

    isActive: {
      type: Boolean,
      default: true
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    // ================= OTP VERIFICATION =================

    otp: {
      type: String,
      default: null
    },

    otpExpires: {
      type: Date,
      default: null
    },

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);