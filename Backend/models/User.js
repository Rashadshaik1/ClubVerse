const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // 🔹 User name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // 🔹 Email (must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // 🔹 Password (hashed)
    password: {
      type: String,
      required: true
    },

    // 🔹 Role of user
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

    // ================= OTP FIELDS (ADDED ONLY) =================

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