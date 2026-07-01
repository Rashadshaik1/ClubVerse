const Event = require("../models/Event");
const Registration = require("../models/Registration");

// ================= CREATE EVENT =================
exports.createEvent = async (req, res) => {
  try {
    if (req.user.role !== "club") {
      return res.status(403).json({
        success: false,
        message: "Only clubs can create events"
      });
    }

    const {
      title,
      category,
      description,
      date,
      venue,
      maxParticipants,
      rules,
      requirements,
      status
    } = req.body;

    const time =
      req.body.eventHour && req.body.eventMinute && req.body.eventPeriod
        ? `${req.body.eventHour}:${req.body.eventMinute} ${req.body.eventPeriod}`
        : "";

    const registrationOpenDate =
      req.body.regStartDate
        ? `${req.body.regStartDate} ${req.body.regStartHour}:${req.body.regStartMinute} ${req.body.regStartPeriod}`
        : "";

    const registrationCloseDate =
      req.body.regEndDate
        ? `${req.body.regEndDate} ${req.body.regEndHour}:${req.body.regEndMinute} ${req.body.regEndPeriod}`
        : "";

    const contactName = req.body.coordinator1Name || "";
    const contactEmail = req.body.coordinator1Email || "";
    const contactPhone = req.body.coordinator1Phone || "";

    const poster = req.files?.poster?.[0]?.path || "";
    const banner = req.files?.banner?.[0]?.path || "";

    const event = await Event.create({
      title,
      category,
      description,
      date,
      time,
      venue,

      poster,
      banner,

      registrationOpenDate,
      registrationCloseDate,

      maxParticipants,
      rules,
      requirements,

      contactName,
      contactEmail,
      contactPhone,

      status,

      // 🔥 FIX MAIN BUG
      clubId: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });

  } catch (error) {
    console.log("CREATE EVENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET ALL EVENTS =================
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("clubId", "name email");

    return res.json({
      success: true,
      events
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET SINGLE EVENT =================
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("clubId");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const registrations = await Registration.find({
      eventId: req.params.id
    });

    return res.json({
      success: true,
      event,
      totalRegistrations: registrations.length
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= CLUB EVENTS =================
exports.getClubEvents = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!clubId) {
      return res.status(400).json({
        success: false,
        message: "clubId required"
      });
    }

    const events = await Event.find({ clubId })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: events   // ✅ FIXED (IMPORTANT)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
// ================= MY EVENTS =================
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      clubId: req.user._id
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      events
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};