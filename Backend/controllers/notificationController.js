const Notification = require("../models/Notification");

// ================= GET CLUB NOTIFICATIONS =================
exports.getClubNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      clubId: req.params.clubId,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      data: notifications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= MARK ALL AS READ =================
exports.markAllAsRead = async (req, res) => {
  try {

    await Notification.updateMany(
      {
        clubId: req.params.clubId,
      },
      {
        isRead: true,
      }
    );

    return res.json({
      success: true,
      message: "Notifications marked as read",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};