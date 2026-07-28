const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  getStudentNotifications,
  markNotificationsRead
} = require("../controllers/studentNotificationController");

// GET notifications
router.get(
  "/",
  protect,
  getStudentNotifications
);

// Mark all as read
router.put(
  "/read",
  protect,
  markNotificationsRead
);

module.exports = router;