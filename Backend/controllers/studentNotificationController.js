const Registration = require("../models/Registration");
const Notification = require("../models/Notification");

// ================= GET STUDENT NOTIFICATIONS =================

exports.getStudentNotifications = async (req, res) => {

  try {

    const registrations = await Registration.find({

      userId: req.user.id

    }).populate({

      path: "eventId",

      select: "clubId"

    });

    const clubIds = registrations.map(

      (reg) => reg.eventId?.clubId

    );

   const notifications = await Notification.find({
  $or: [
    { userId: req.user._id },
    { clubId: { $in: clubIds } }
  ]
}).sort({ createdAt: -1 });
    res.json({

      success: true,

      data: notifications

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
// ================= MARK STUDENT NOTIFICATIONS AS READ =================

exports.markNotificationsRead = async (req, res) => {
  try {

    // Get all clubs in which the student has registered
    const registrations = await Registration.find({
      userId: req.user._id
    }).populate({
      path: "eventId",
      select: "clubId"
    });

    const clubIds = registrations
      .map((reg) => reg.eventId?.clubId)
      .filter(Boolean);

    // Mark both personal and club notifications as read
    await Notification.updateMany(
      {
        $or: [
          { userId: req.user._id },
          { clubId: { $in: clubIds } }
        ],
        isRead: false
      },
      {
        $set: {
          isRead: true
        }
      }
    );

    return res.json({
      success: true,
      message: "Notifications marked as read"
    });

  } catch (error) {

    console.log("MARK NOTIFICATIONS READ ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};