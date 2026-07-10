const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

    registrationOpenDate: {
      type: Date,
    },

    registrationCloseDate: {
      type: Date,
    },

    maxParticipants: {
      type: Number,
      default: 0,
    },

    rules: {
      type: String,
      default: "",
    },

    requirements: {
      type: String,
      default: "",
    },

    contactName: {
      type: String,
      default: "",
    },

    contactEmail: {
      type: String,
      default: "",
    },

    contactPhone: {
      type: String,
      default: "",
    },

    status: {
  type: String,
  enum: [
    "draft",
    "upcoming",
    "ongoing",
    "completed",
    "cancelled",
  ],
  default: "upcoming",
},

    cancelReason: {
  type: String,
  default: "",
},

cancelledAt: {
  type: Date,
  default: null,
},

    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },

    // ================= GALLERY =================
    gallery: [
      {
        image: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ================= FEEDBACK =================
    feedback: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },

        comment: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);