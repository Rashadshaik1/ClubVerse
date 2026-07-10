const express = require("express");
const router = express.Router();

const {
  getClubNotifications,
  markAllAsRead,
} = require("../controllers/notificationController");

// ================= GET CLUB NOTIFICATIONS =================
router.get(
  "/:clubId",
  getClubNotifications
);

// ================= MARK NOTIFICATIONS AS READ =================
router.put(
  "/read/:clubId",
  markAllAsRead
);

module.exports = router;