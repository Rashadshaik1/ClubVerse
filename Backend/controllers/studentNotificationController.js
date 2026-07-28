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
exports.markNotificationsRead = async (req,res)=>{
  try{

    await Notification.updateMany(
      {
        userId:req.user._id,
        isRead:false
      },
      {
        isRead:true
      }
    );

    res.json({
      success:true
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};