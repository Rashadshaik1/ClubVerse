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

    const userId = req.user.id;



    // STEP 3: Get eventId from frontend

    const { eventId } = req.body;




    // 🚫 STEP 4: Check duplicate registration

    const exists = await Registration.findOne({

      userId,

      eventId

    });



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





    // 🔔 STEP 6: CHECK REGISTRATION MILESTONE

    const event =
    await Event.findById(eventId);



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

exports.getMyRegs = async(req,res)=>{


try{


// Get all registrations of logged-in user

const regs =
await Registration.find({

userId:req.user.id

})

.populate(
"eventId"
)

.populate(
"userId",
"name email"
);




res.json({

success:true,

data:regs

});



}
catch(error){


res.status(500).json({

error:error.message

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