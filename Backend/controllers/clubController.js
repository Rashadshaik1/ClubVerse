const Club = require("../models/Club");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

    const isMatch = await bcrypt.compare(
      password,
      club.password
    );

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
    // DB nunchi anni clubs fetch chestunnam
    const clubs = await Club.find();

    res.json(clubs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};