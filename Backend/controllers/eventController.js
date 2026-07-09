const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

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

/// ================= ADDED: CHANGE EVENT VENUE & EMAIL NOTIFY =================
exports.changeVenue = async (req, res) => {

  try {

    const { id } = req.params;
    const { venue } = req.body;


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



    const registrations =
    await Registration.find({
      eventId:id
    });



    const emailList =
    registrations
    .map(
      reg =>
      reg.email ||
      reg.studentEmail ||
      reg.userEmail
    )
    .filter(Boolean);



    if(emailList.length > 0){

      const mailOptions = {

        from:process.env.EMAIL,

        to:emailList.join(","),

        subject:
        `⚠️ Venue Changed Alert: ${event.title}`,

        html:`
        <div style="font-family:Arial;padding:20px">

        <h2 style="color:#048c92">
        Important Update Regarding ${event.title}
        </h2>

        <p>Hello Participant,</p>

        <p>
        Please note that the venue for the event has been updated.
        </p>


        <p>
        <b>New Venue:</b> ${venue}
        </p>


        </div>
        `

      };


      await transporter.sendMail(mailOptions);

    }



    return res.json({

      success:true,

      message:
      "Venue updated and notifications sent!",

      event

    });



  }
  catch(error){

    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

/// ================= ADDED: POSTPONE EVENT & EMAIL NOTIFY =================
exports.postponeEvent = async (req,res)=>{


try{


const {id}=req.params;

const {date,reason}=req.body;



const event =
await Event.findByIdAndUpdate(

id,

{date},

{new:true}

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





const registrations =
await Registration.find({

eventId:id

});



const emailList =
registrations
.map(
reg =>
reg.email ||
reg.studentEmail ||
reg.userEmail
)
.filter(Boolean);





if(emailList.length>0){



const mailOptions={


from:process.env.EMAIL,


to:emailList.join(","),


subject:
`⏰ Event Postponed Notice: ${event.title}`,


html:`

<div style="font-family:Arial;padding:20px">

<h2 style="color:#048c92">
Timeline Rescheduled: ${event.title}
</h2>


<p>Hello Participant,</p>


<p>
The event has been postponed.
</p>


<p>
<b>New Date:</b>
${new Date(date).toLocaleDateString()}
</p>


<p>
<b>Reason:</b>
${reason}
</p>


</div>

`

};



await transporter.sendMail(mailOptions);


}





return res.json({

success:true,

message:
"Event postponed and notifications sent!",

event

});



}
catch(error){


return res.status(500).json({

success:false,

message:error.message

});


}


};
// ================= CANCEL EVENT & EMAIL NOTIFY =================
exports.cancelEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found."
      });
    }

    if (event.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Event is already cancelled."
      });
    }

    if (event.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed events cannot be cancelled."
      });
    }

    event.status = "cancelled";
    event.cancelReason = reason || "";
    event.cancelledAt = new Date();

    await event.save();

    await Notification.create({
      clubId: event.clubId,
      message: `${event.title} has been cancelled`,
      type: "EVENT_UPDATE"
    });

    const registrations = await Registration.find({ eventId: id });

    const emailList = registrations
      .map(reg => reg.email || reg.studentEmail || reg.userEmail)
      .filter(Boolean);

    if (emailList.length > 0) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailList.join(","),
        subject: `❌ Event Cancelled: ${event.title}`,
        html: `
        <div style="font-family:Arial;padding:20px">
        <h2 style="color:#d9534f">Event Cancellation Notice</h2>
        <p>Hello Participant,</p>
        <p>We regret to inform you that the following event has been cancelled.</p>
        <p><b>Event:</b> ${event.title}</p>
        <p><b>Reason:</b> ${reason || "Not specified"}</p>
        <hr/>
        <p style="font-size:12px;color:#777">This is an automated notification.</p>
        </div>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    return res.json({
      success: true,
      message: "Event cancelled and emails sent!",
      event
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
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
        message: "Event not found"
      });
    }

    event.feedback.push({
      user: req.user.id,
      rating,
      comment
    });

    await event.save();

    res.json({
      success: true,
      message: "Feedback submitted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};