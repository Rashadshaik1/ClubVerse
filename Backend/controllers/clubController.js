const Club = require("../models/Club");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notification = require("../models/Notification");


// ================= LOGIN CLUB =================
exports.loginClub = async (req, res) => {
  try {
    const { email, password } = req.body;

    const club = await Club.findOne({
      email: email.toLowerCase().trim()
    });

    if (!club) {
      return res.status(404).json({
        msg: "Invalid club credentials"
      });
    }

    if (club.isBlocked) {
      return res.status(403).json({
        msg: "This club has been blocked by Super Admin."
      });
    }

    const isMatch = await bcrypt.compare(password, club.password);

    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid club credentials"
      });
    }

    const token = jwt.sign(
      {
        id: club._id,
        role: "club"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      token,
      club: {
        _id: club._id,
        name: club.name,
        email: club.email,
        type: club.type,
        logo: club.logo
      }
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error"
    });
  }
};


// ================= GET ALL CLUBS =================
exports.getClubs = async (req, res) => {
  try {

    const clubs = await Club.find();

    res.json(clubs);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {

    const club = await Club.findById(req.user._id)
      .select("-password");


    if (!club) {

      return res.status(404).json({
        success:false,
        msg:"Club not found"
      });

    }


    res.json({
      success:true,
      data:club
    });


  } catch(err){

    res.status(500).json({
      success:false,
      msg:err.message
    });

  }
};



// ================= UPDATE PROFILE =================
exports.updateProfile = async (req,res)=>{

try{

const club = await Club.findById(req.user._id);


if(!club){

return res.status(404).json({
success:false,
msg:"Club not found"
});

}


// Basic Details
club.description =
req.body.description || "";

club.establishedYear =
req.body.establishedYear || "";


// Faculty Coordinator
club.facultyCoordinator = {

name:
req.body.facultyCoordinator?.name || "",

email:
req.body.facultyCoordinator?.email || "",

};


// Contact Details
club.contactNumber =
req.body.contactNumber || "";

club.location =
req.body.location || "";


// Social Links
club.instagram =
req.body.instagram || "";

club.linkedin =
req.body.linkedin || "";

club.website =
req.body.website || "";


// Images
club.logo =
req.body.logo || club.logo;

club.banner =
req.body.banner || club.banner;



await club.save();


// 🔔 CREATE NOTIFICATION
await Notification.create({

clubId: club._id,

message:
"Your club profile has been updated successfully",

type:
"PROFILE_UPDATE"

});


return res.status(200).json({

success:true,

message:
"Profile updated successfully",

data:club,

});


}
catch(err){

console.log(err);


return res.status(500).json({

success:false,

msg:"Server Error",

error:err.message

});

}

};



// ================= CHANGE PASSWORD =================
exports.changePassword = async(req,res)=>{

try{

const {
currentPassword,
newPassword,
confirmPassword
}=req.body;


const club = await Club.findById(req.user._id);


if(!club){

return res.status(404).json({
success:false,
msg:"Club not found"
});

}


// Check old password

const isMatch = await bcrypt.compare(
currentPassword,
club.password
);


if(!isMatch){

return res.status(400).json({
success:false,
msg:"Current password is incorrect"
});

}


// Check new password

if(newPassword !== confirmPassword){

return res.status(400).json({
success:false,
msg:"New password and confirm password do not match"
});

}


// Password strength

if(newPassword.length < 6){

return res.status(400).json({
success:false,
msg:"Password must contain minimum 6 characters"
});

}



// Hash new password

const salt = await bcrypt.genSalt(10);

club.password = await bcrypt.hash(
newPassword,
salt
);


// Security tracking

club.passwordChangedAt = new Date();


await club.save();



res.status(200).json({

success:true,

message:"Password changed successfully"

});


}
catch(err){

console.log(err);

res.status(500).json({

success:false,

msg:"Server Error"

});

}

};