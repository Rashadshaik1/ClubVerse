const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Notification = require("../models/Notification");


// ================= REGISTER EVENT =================
exports.registerEvent = async (req, res) => {

  try {


    // 🔒 STEP 1: Only students can register

    if(req.user.role !== "student"){

      return res.status(403).json({
        msg:"Only students can register"
      });

    }



    // STEP 2: Get logged-in user id

    const userId = req.user._id;



    // STEP 3: Get eventId from frontend

    const { eventId } = req.body;


console.log("===== REGISTER EVENT =====");
console.log("User ID:", userId);
console.log("Event ID:", eventId);

    // 🚫 STEP 4: Check duplicate registration

    const exists = await Registration.findOne({

      userId,

      eventId

    });


console.log("Exists:", exists);
    if(exists){

      return res.status(400).json({

        msg:"Already registered for this event"

      });

    }




    // STEP 5: Create registration

    const reg = await Registration.create({

      userId,

      eventId

    });

console.log("===== REGISTRATION CREATED =====");
console.log("New Registration:", reg);

const total = await Registration.countDocuments();
console.log("Total Registrations:", total);



    // 🔔 STEP 6: CHECK REGISTRATION MILESTONE

    const event = await Event.findById(eventId);

console.log("EVENT FOR NOTIFICATION:", event);

if(event){

  const notification = await Notification.create({
    userId: userId,
    relatedEvent: eventId,
    message: `You have successfully registered for "${event.title}" 🎉`,
    type: "REGISTRATION"
  });

  console.log("NOTIFICATION CREATED:", notification);

}
    if(event){


      const totalRegistrations =
      await Registration.countDocuments({

        eventId

      });




      if(

        totalRegistrations === 50 ||

        totalRegistrations === 100 ||

        totalRegistrations === 150

      ){



        await Notification.create({

          clubId:event.clubId,


          message:
          `${event.title} reached ${totalRegistrations} registrations 🎉`,


          type:"REGISTRATION"


        });


      }


    }





    // STEP 7: Send response

    res.status(201).json({

      success:true,

      data:reg

    });



  }
  catch(error){

    res.status(500).json({

      error:error.message

    });

  }

};





// ================= GET MY REGISTRATIONS =================

exports.getMyRegs = async (req, res) => {
  try {

    console.log("========== GET MY REGS ==========");
    console.log("User ID:", req.user._id);
    console.log("Email:", req.user.email);

    const regs = await Registration.find({
      userId: req.user._id
    })
      .populate("eventId", "title")
      .populate("userId", "name email");

    console.log("Total Registrations:", regs.length);

    regs.forEach((reg) => {
      console.log(
        "Event:",
        reg.eventId?.title,
        "| User:",
        reg.userId?.email
      );
    });

    res.json({
      success: true,
      data: regs
    });

  } catch (error) {
    console.log(error);

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