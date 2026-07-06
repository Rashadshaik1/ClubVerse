const Event = require("../models/Event");
const Registration = require("../models/Registration");
const nodemailer = require("nodemailer"); // 👈 Just ee requirement add chesa

// ================= NODEMAILER CONFIGURATION =================
// `.env` lo unna EMAIL, EMAIL_PASS references ni auto-detect chestundi
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= CREATE EVENT =================
exports.createEvent = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "club") {
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

    // ✅ CHANGED HERE: via.placeholder error crash avvakunda highly optimized Unsplash URLs default fallbacks ga petta
    const poster = req.files?.poster?.[0] 
      ? `data:${req.files.poster[0].mimetype};base64,${req.files.poster[0].buffer.toString("base64")}` 
      : "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500";

    const banner = req.files?.banner?.[0] 
      ? `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}` 
      : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200";

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
      maxParticipants: maxParticipants ? Number(maxParticipants) : undefined,
      rules,
      requirements,
      contactName,
      contactEmail,
      contactPhone,
      // 👇 CHANGED HERE: Lowercase 'upcoming' to match your strict Mongoose enum setup
      status: status || "upcoming", 
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
    const events = await Event.find().populate("clubId", "name email");
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
    const event = await Event.findById(req.params.id).populate("clubId");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const registrations = await Registration.find({ eventId: req.params.id });

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

    const events = await Event.find({ clubId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: events
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
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Club context missing."
      });
    }

    const events = await Event.find({
      clubId: req.user._id
    }).sort({ createdAt: -1 });

    // ✅ FIX: Mapping structure into standard 'data' block payload array matching frontend
    return res.json({
      success: true,
      data: events 
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= ADDED: CHANGE EVENT VENUE & EMAIL NOTIFY =================
exports.changeVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { venue } = req.body;

    const event = await Event.findByIdAndUpdate(id, { venue }, { new: true });
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    const registrations = await Registration.find({ eventId: id });
    const emailList = registrations
      .map(reg => reg.email || reg.studentEmail || reg.userEmail)
      .filter(Boolean);

    if (emailList.length > 0) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailList.join(","), 
        subject: `⚠️ Venue Changed Alert: ${event.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #cceeee; border-radius: 12px; max-width: 600px;">
            <h2 style="color: #048c92;">Important Update Regarding ${event.title}</h2>
            <p>Hello Participant,</p>
            <p>Please note that the venue for the event has been updated.</p>
            <p style="background: #f4ffff; padding: 12px; border-left: 4px solid #43bfc3; border-radius: 4px;">
              <b>New Venue Location:</b> ${venue}
            </p>
            <hr style="border: 0; border-top: 1px solid #cceeee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">This is an automated notification. Do not reply directly.</p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
    }

    return res.json({ success: true, message: "Venue updated and emails sent!", event });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ADDED: POSTPONE EVENT & EMAIL NOTIFY =================
exports.postponeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, reason } = req.body;

    const event = await Event.findByIdAndUpdate(id, { date }, { new: true });
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    const registrations = await Registration.find({ eventId: id });
    const emailList = registrations
      .map(reg => reg.email || reg.studentEmail || reg.userEmail)
      .filter(Boolean);

    if (emailList.length > 0) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailList.join(","),
        subject: `⏰ Event Postponed Notice: ${event.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #cceeee; border-radius: 12px; max-width: 600px;">
            <h2 style="color: #048c92;">Timeline Rescheduled: ${event.title}</h2>
            <p>Hello Participant,</p>
            <p>The event has been postponed due to operational requirements.</p>
            <div style="background: #f4ffff; padding: 12px; border-left: 4px solid #43bfc3; margin-bottom: 10px; border-radius: 4px;">
              <b>New Event Date:</b> ${new Date(date).toLocaleDateString()}
            </div>
            <p><b>Reason:</b> ${reason}</p>
            <hr style="border: 0; border-top: 1px solid #cceeee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">Automated notification sequence.</p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
    }

    return res.json({ success: true, message: "Event postponed and emails sent!", event });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};