const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Notification = require("../models/Notification");


// ================= REGISTER EVENT =================
exports.registerEvent = async (req, res) => {
  try {
    // ================= STEP 1: ONLY STUDENTS =================
    if (!req.user || req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        msg: "Only students can register",
      });
    }

    // ================= STEP 2: GET DATA =================
    const userId = req.user._id;
    const { eventId, mobile } = req.body;

    // ================= STEP 3: VALIDATE EVENT ID =================
    if (!eventId) {
      return res.status(400).json({
        success: false,
        msg: "Event ID is required",
      });
    }

    // ================= STEP 4: VALIDATE MOBILE =================
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        msg: "Please enter a valid 10-digit mobile number",
      });
    }

    console.log("===== REGISTER EVENT =====");
    console.log("User ID:", userId);
    console.log("Event ID:", eventId);
    console.log("Mobile:", mobile);

    // ================= STEP 5: FIND EVENT =================
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        msg: "Event not found",
      });
    }

    // ================= STEP 6: EVENT STATUS CHECK =================
    if (event.status === "cancelled") {
      return res.status(400).json({
        success: false,
        msg: "Registration is closed because this event has been cancelled.",
      });
    }

    if (event.status === "completed") {
      return res.status(400).json({
        success: false,
        msg: "Registration is closed because this event has been completed.",
      });
    }

    // ================= STEP 7: REGISTRATION OPEN DATE =================

    const now = new Date();

    if (event.registrationOpenDate) {
      const openingDate = new Date(event.registrationOpenDate);

      if (now < openingDate) {
        return res.status(400).json({
          success: false,
          msg: `Registration has not opened yet. It opens on ${openingDate.toLocaleString()}.`,
        });
      }
    }

    // ================= STEP 8: REGISTRATION CLOSE DATE =================

    if (event.registrationCloseDate) {
      const closingDate = new Date(event.registrationCloseDate);

      if (now > closingDate) {
        return res.status(400).json({
          success: false,
          msg: "Registration for this event is closed.",
        });
      }
    }

    // ================= STEP 9: CHECK DUPLICATE =================

    const exists = await Registration.findOne({
      userId,
      eventId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        msg: "Already registered for this event",
      });
    }

    // ================= STEP 10: CHECK MAX PARTICIPANTS =================

    if (event.maxParticipants && event.maxParticipants > 0) {
      const totalRegistrations = await Registration.countDocuments({
        eventId,
      });

      if (totalRegistrations >= event.maxParticipants) {
        return res.status(400).json({
          success: false,
          msg: "Registration is full.",
        });
      }
    }

    // ================= STEP 11: CREATE REGISTRATION =================

    const reg = await Registration.create({
      userId,
      eventId,
      mobile,
    });

    console.log("===== REGISTRATION CREATED =====");
    console.log("New Registration:", reg);

    // ================= STEP 12: STUDENT NOTIFICATION =================

    await Notification.create({
      userId: userId,
      relatedEvent: eventId,
      message: `You have successfully registered for "${event.title}" 🎉`,
      type: "REGISTRATION",
    });

    // ================= STEP 13: REGISTRATION MILESTONE =================

    const totalRegistrations = await Registration.countDocuments({
      eventId,
    });

    if (
      totalRegistrations === 50 ||
      totalRegistrations === 100 ||
      totalRegistrations === 150
    ) {
      await Notification.create({
        clubId: event.clubId,
        message: `${event.title} reached ${totalRegistrations} registrations 🎉`,
        type: "REGISTRATION",
      });
    }

    // ================= STEP 14: SUCCESS RESPONSE =================

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: reg,
      totalRegistrations,
    });

  } catch (error) {
    console.log("REGISTER EVENT ERROR:", error);

    // Duplicate index protection
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        msg: "Already registered for this event",
      });
    }

    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// ================= GET MY REGISTRATIONS =================

exports.getMyRegs = async (req, res) => {
  try {

    const regs = await Registration.find({
      userId: req.user._id
    })
      .populate({
        path: "eventId",
        populate: {
          path: "clubId",
          select: "name"
        }
      })
      .populate("userId", "name email");

    res.json({
      success: true,
      data: regs
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// ================= GET EVENT REGISTRATIONS (CLUB ADMIN) =================

exports.getEventRegistrations = async (req, res) => {

  try {

    const { eventId } = req.params;

    const registrations = await Registration.find({

      eventId

    })

      .populate(

        "userId",

        "name email rollNumber department year section"

      )

      .sort({

        createdAt: -1

      });

    res.json({

      success: true,

      count: registrations.length,

      data: registrations

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};