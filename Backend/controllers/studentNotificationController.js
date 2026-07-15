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

      clubId: {

        $in: clubIds

      }

    })

    .sort({

      createdAt: -1

    });

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