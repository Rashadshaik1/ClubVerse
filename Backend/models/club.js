const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    // Club Name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Club Login Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Club Login Password
    password: {
      type: String,
      required: true
    },

    // Club Type
    type: {
      type: String,
      enum: ["social", "technical", "cultural"],
      default: "social"
    },

    // Club Description
    description: {
      type: String,
      default: ""
    },

    // Club Logo
    logo: {
      type: String,
      default: ""
    },

    // Block / Unblock
    isBlocked: {
      type: Boolean,
      default: false
    },

    // Active Status
    isActive: {
      type: Boolean,
      default: true
    },

    // Created By (Super Admin)
    createdBy: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Club || mongoose.model("Club", clubSchema);