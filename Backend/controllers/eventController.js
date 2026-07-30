const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Notification = require("../models/Notification");
// const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

const updateEventStatus = async (event) => {
  if (!event) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);

  let newStatus = event.status;

  if (event.status !== "cancelled") {
    if (eventDate.getTime() < today.getTime()) {
      newStatus = "completed";
    } else if (eventDate.getTime() === today.getTime()) {
      newStatus = "ongoing";
    } else {
      newStatus = "upcoming";
    }

    if (event.status !== newStatus) {
      event.status = newStatus;
      await event.save();
    }
  }
};
// ================= NODEMAILER CONFIGURATION =================


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
    const events = await Event.find().populate("clubId", "name email type");
    for (const event of events) {
  await updateEventStatus(event);
}
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
    const event = await Event.findById(req.params.id).populate(
  "clubId",
  "name email type"
);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
await updateEventStatus(event);
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
    for (const event of events) {
  await updateEventStatus(event);
}

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
for (const event of events) {
  await updateEventStatus(event);
}
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

/// ================= ADDED: CHANGE EVENT VENUE & EMAIL NOTIFY =================
       // ================= CHANGE EVENT VENUE & EMAIL NOTIFY =================

exports.changeVenue = async (req, res) => {
console.log("🔥 CHANGE VENUE API HIT");
  console.log("PARAMS:", req.params);
  console.log("BODY:", req.body);
  try {

    const { id } = req.params;
    const { venue } = req.body;


    if (!venue) {
      return res.status(400).json({
        success:false,
        message:"Venue is required"
      });
    }


    const event = await Event.findByIdAndUpdate(
      id,
      { venue },
      { new:true }
    );


    if(!event){

      return res.status(404).json({
        success:false,
        message:"Event not found."
      });

    }


    // 🔔 CLUB NOTIFICATION

    await Notification.create({

      clubId:event.clubId,

      message:
      `${event.title} venue has been changed to ${venue}`,

      type:"EVENT_UPDATE"

    });



    // ================= GET REGISTERED STUDENTS =================

    const registrations =
    await Registration.find({
      eventId:id
    })
    .populate("userId","email");



    console.log(
      "===== VENUE CHANGE REGISTRATIONS ====="
    );

    console.log(
      JSON.stringify(registrations,null,2)
    );



    // ================= EXTRACT EMAILS =================

    const emailList =
    registrations
    .map(
      reg => reg.userId?.email
    )
    .filter(Boolean);



    console.log(
      "EMAIL LIST:",
      emailList
    );



    // ================= SEND EMAIL =================

    if(emailList.length > 0){


   await sendEmail({
  to: emailList,
  subject: `⚠️ Venue Changed Alert: ${event.title}`,
  html: `
    <div style="font-family:Arial;padding:20px">
      <h2 style="color:#048c92">
        Important Update Regarding ${event.title}
      </h2>

      <p>Hello Participant,</p>

      <p>Please note that the venue for the event has been updated.</p>

      <p><b>Event:</b> ${event.title}</p>

      <p><b>New Venue:</b> ${venue}</p>

      <p>Please make note of the updated venue.</p>
    </div>
  `
});


      console.log(
        "EMAILS SENT SUCCESSFULLY"
      );

    }
    else{

      console.log(
        "NO EMAILS FOUND"
      );

    }



    return res.json({

      success:true,

      message:
      "Venue updated and notifications sent!",

      event

    });



  }

  catch(error){


    console.log(
      "CHANGE VENUE ERROR:",
      error
    );


    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

/// ================= ADDED: POSTPONE EVENT & EMAIL NOTIFY =================
// ================= POSTPONE EVENT & EMAIL NOTIFY =================

exports.postponeEvent = async (req,res)=>{

  try{

    const { id } = req.params;
    const { date, reason } = req.body;


    const event = await Event.findByIdAndUpdate(
      id,
      { date },
      { new:true }
    );


    if(!event){

      return res.status(404).json({
        success:false,
        message:"Event not found."
      });

    }



    // 🔔 CLUB NOTIFICATION

    await Notification.create({

      clubId:event.clubId,

      message:
      `${event.title} has been postponed to ${new Date(date).toLocaleDateString()}`,

      type:"EVENT_UPDATE"

    });



    // ================= GET REGISTERED STUDENTS =================

    const registrations =
    await Registration.find({
      eventId:id
    })
    .populate("userId","email");



    console.log(
      "===== POSTPONE EVENT REGISTRATIONS ====="
    );

    console.log(
      JSON.stringify(registrations,null,2)
    );



    // ================= EMAIL LIST =================

    const emailList =
    registrations
    .map(
      reg => reg.userId?.email
    )
    .filter(Boolean);



    console.log(
      "EMAIL LIST:",
      emailList
    );



    // ================= SEND EMAIL =================

    if(emailList.length > 0){


      await sendEmail({
  to: emailList,
  subject: `⏰ Event Postponed Notice: ${event.title}`,
  html: `
    <div style="font-family:Arial;padding:20px">

      <h2 style="color:#048c92">
        Event Rescheduled: ${event.title}
      </h2>

      <p>Hello Participant,</p>

      <p>The event has been postponed.</p>

      <p>
        <b>New Date:</b>
        ${new Date(date).toLocaleDateString()}
      </p>

      <p>
        <b>Reason:</b>
        ${reason || "Not specified"}
      </p>

    </div>
  `
});


      console.log(
        "POSTPONE EMAILS SENT"
      );

    }



    return res.json({

      success:true,

      message:
      "Event postponed and notifications sent!",

      event

    });



  }

  catch(error){

    console.log(
      "POSTPONE ERROR:",
      error
    );


    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
// ================= CANCEL EVENT & EMAIL NOTIFY =================
// ================= CANCEL EVENT & EMAIL NOTIFY =================

exports.cancelEvent = async (req,res)=>{

  try{

    const { id } = req.params;
    const { reason } = req.body;


    const event =
    await Event.findById(id);



    if(!event){

      return res.status(404).json({

        success:false,

        message:"Event not found."

      });

    }



    if(event.status === "cancelled"){

      return res.status(400).json({

        success:false,

        message:"Event already cancelled."

      });

    }



    if(event.status === "completed"){

      return res.status(400).json({

        success:false,

        message:"Completed events cannot be cancelled."

      });

    }



    event.status = "cancelled";
    event.cancelReason = reason || "";
    event.cancelledAt = new Date();


    await event.save();



    // 🔔 CLUB NOTIFICATION

    await Notification.create({

      clubId:event.clubId,

      message:
      `${event.title} has been cancelled`,

      type:"EVENT_UPDATE"

    });




    // ================= GET REGISTERED STUDENTS =================

    const registrations =
    await Registration.find({
      eventId:id
    })
    .populate("userId","email");



    console.log(
      "===== CANCEL EVENT REGISTRATIONS ====="
    );

    console.log(
      JSON.stringify(registrations,null,2)
    );



    const emailList =
    registrations
    .map(
      reg => reg.userId?.email
    )
    .filter(Boolean);



    console.log(
      "EMAIL LIST:",
      emailList
    );




    // ================= SEND EMAIL =================


    if(emailList.length > 0){


      await sendEmail({
  to: emailList,
  subject: `❌ Event Cancelled: ${event.title}`,
  html: `
    <div style="font-family:Arial;padding:20px">

      <h2 style="color:#d9534f">
        Event Cancellation Notice
      </h2>

      <p>Hello Participant,</p>

      <p>
        We regret to inform you that the event has been cancelled.
      </p>

      <p>
        <b>Event:</b> ${event.title}
      </p>

      <p>
        <b>Reason:</b> ${reason || "Not specified"}
      </p>

    </div>
  `
});

console.log("CANCEL EMAILS SENT");


      console.log(
        "CANCEL EMAILS SENT"
      );

    }



    return res.json({

      success:true,

      message:
      "Event cancelled and emails sent!",

      event

    });



  }

  catch(error){

    console.log(
      "CANCEL EVENT ERROR:",
      error
    );


    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
// ================= UPLOAD GALLERY IMAGES =================
exports.uploadGalleryImages = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload images"
      });
    }

    const images = req.files.map(file => ({
      image: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
    }));

    event.gallery.push(...images);

    await event.save();

    res.json({
      success: true,
      message: "Gallery updated successfully",
      gallery: event.gallery
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ================= GET GALLERY =================
exports.getGalleryImages = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({
        success: false,
        message: "Event not found"
      });

    }

    res.json({
      success: true,
      gallery: event.gallery
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ================= DELETE GALLERY IMAGE =================
exports.deleteGalleryImage = async (req, res) => {

  try {

    const event = await Event.findById(req.params.eventId);

    if (!event) {

      return res.status(404).json({
        success: false,
        message: "Event not found"
      });

    }

    event.gallery = event.gallery.filter(
      img => img._id.toString() !== req.params.imageId
    );

    await event.save();

    res.json({
      success: true,
      message: "Image deleted successfully",
      gallery: event.gallery
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
//=============== FeedBack =============
exports.addFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Only completed events can receive feedback
    if (event.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Feedback is available only after the event is completed.",
      });
    }

    // Student must be registered
    const registration = await Registration.findOne({
      eventId: event._id,
      userId: req.user.id,
    });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: "Only registered participants can submit feedback.",
      });
    }

    // Prevent duplicate feedback
    const alreadyGiven = event.feedback.find(
      (fb) => fb.user.toString() === req.user.id
    );

    if (alreadyGiven) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted feedback.",
      });
    }

    event.feedback.push({
      user: req.user.id,
      rating,
      comment,
    });

    await event.save();

    res.json({
      success: true,
      message: "Feedback submitted successfully.",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ================= GET EVENT REGISTRATIONS =================

exports.getEventRegistrations = async (req, res) => {

  try {

    const registrations = await Registration.find({

      eventId: req.params.id

    })

    .populate(

      "userId",

      "name email rollNumber department"

    )

    .sort({

      createdAt: -1

    });

    // console.log("===== REGISTRATIONS =====");
console.log(JSON.stringify(registrations, null, 2));

    res.json({

      success: true,

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

// ================= COMPLETE EVENT =================

exports.completeEvent = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }


    event.status = "completed";

    await event.save();


    return res.json({
      success: true,
      message: "Event marked as completed",
      event
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
