const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    // Club Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Login Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Login Password
    password: {
      type: String,
      required: true,
    },

    // Password Security Tracking
    passwordChangedAt: {
      type: Date,
      default: null,
    },

    // Club Category
    type: {
      type: String,
      enum: ["social", "technical", "cultural"],
      default: "social",
    },

    // About Club
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Established Year
    establishedYear: {
      type: String,
      default: "",
      trim: true,
    },

    // Faculty Coordinator
    facultyCoordinator: {
      name: {
        type: String,
        default: "",
        trim: true,
      },
      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },
    },

    // Contact Number
    contactNumber: {
      type: String,
      default: "",
      trim: true,
    },

    // Club Room / Location
    location: {
      type: String,
      default: "",
      trim: true,
    },

    // Social Media Links
    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    // Images
    logo: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

    // Account Status
    isBlocked: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Created By (Super Admin)
    createdBy: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Club || mongoose.model("Club", clubSchema);