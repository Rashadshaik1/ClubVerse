const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  getStudentNotifications
} = require("../controllers/studentNotificationController");

router.get(
  "/",
  protect,
  getStudentNotifications
);

module.exports = router;