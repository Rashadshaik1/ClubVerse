const User = require("../models/User");
const Club = require("../models/Club"); 
const Event = require("../models/Event");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


// ================= CREATE ADMIN =================
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const cleanEmail = email.toLowerCase().trim();

    const exists = await User.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(400).json({ msg: "Admin already exists" });
    }
    
    const plainPassword = password;
    const hashedPassword = await bcrypt.hash(String(password), 10);

    const admin = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "admin"
    });

   return res.status(201).json({
  success:true,
  data:{
    id:club._id,
    name:club.name,
    email:club.email,
    type:club.type
  }
});

  } catch (error) {
    console.log("ADMIN ERROR:", error);
    return res.status(500).json({
      msg: "Server error",
      error: error.message
    });
  }
};


// ================= CREATE CLUB ACCOUNT =================
exports.createClubAccount = async (req, res) => {
  try {
    let { name, email, password, type, description, logo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Name, Email, Password required"
      });
    }

    email = email.toLowerCase().trim();
    name = name.trim();

    if (!email.endsWith("@gvpce.ac.in")) {
      return res.status(400).json({
        msg: "Only @gvpce.ac.in emails allowed"
      });
    }

    const exists = await Club.findOne({ email });
    if (exists) {
      return res.status(400).json({
        msg: "Club already exists"
      });
    }

    const plainPassword = password;

const hashedPassword = await bcrypt.hash(String(password), 10);

    let safeLogo = "";
    if (typeof logo === "string" && logo.length < 1000000) {
      safeLogo = logo;
    }

    const club = await Club.create({
  name,
  email,
  password: hashedPassword,
  type: type || "social",
  description: description || "",
  logo: safeLogo,
  createdBy: req.user?.id || ""
});

// SEND LOGIN CREDENTIALS EMAIL

const transporter = nodemailer.createTransport({

  service:"gmail",

  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASS
  }

});


await transporter.sendMail({

  from:`"ClubVerse Team" <${process.env.EMAIL}>`,

  to:email,

  subject:"Welcome to ClubVerse - Club Account Created 🎉",

  html:`

  <h2>Welcome to ClubVerse 🎉</h2>

  <p>Your club account has been created successfully.</p>

  <h3>Your Login Credentials:</h3>

  <p>
  <b>Email:</b> ${email}
  </p>

  <p>
  <b>Password:</b> ${plainPassword}
  </p>


  <br/>

  <p>
  Login to ClubVerse using these credentials.
  </p>

  <p>
  After first login, please change your password from Profile section.
  </p>


  <br/>

  <p>
  Regards,<br/>
  ClubVerse Team
  </p>

  `

});

    return res.status(201).json({
      success: true,
      data: club
    });

  } catch (error) {
    console.log("CREATE CLUB ERROR:", error);
    return res.status(500).json({
      msg: "Server error while creating club",
      error: error.message
    });
  }
};


// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
  .select("-password")
  .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: users
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// ================= GET ALL EVENTS =================
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
  .populate("clubId")
  .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: events
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// ================= GET EVENTS BY CLUB (🔥 NEW FOR ANALYTICS) =================
exports.getEventsByClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ msg: "Invalid club ID" });
    }

    const events = await Event.find({ clubId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: events
    });

  } catch (error) {
    return res.status(500).json({
      msg: "Server error while fetching club events",
      error: error.message
    });
  }
};


// ================= DELETE CLUB =================
exports.deleteClub = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid club ID" });
    }

    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ msg: "Club not found" });
    }

    

   await Event.deleteMany({
  clubId:id
});

await Club.findByIdAndDelete(id);

    return res.json({
      success: true,
      msg: "Club deleted successfully"
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    return res.status(500).json({
      msg: "Server error while deleting club",
      error: error.message
    });
  }
};


// ================= BLOCK / UNBLOCK CLUB =================
exports.blockClub = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid club ID" });
    }

    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ msg: "Club not found" });
    }

    
    club.isBlocked = !club.isBlocked;
    await club.save();

    return res.json({
      success: true,
      msg: club.isBlocked ? "Club blocked" : "Club unblocked",
      data: club
    });

  } catch (error) {
    console.log("BLOCK ERROR:", error);
    return res.status(500).json({
      msg: "Server error while blocking club",
      error: error.message
    });
  }
};
// ================= GET ALL CLUBS =================
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
  .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: clubs
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};