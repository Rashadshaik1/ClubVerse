const Club = require("../models/Club");


// ================= CREATE CLUB =================
exports.createClub = async (req, res) => {
  try {
    // req.body lo frontend nunchi data vastundi
    const { name, description } = req.body;

    // JWT middleware already user info add chesindi
    // req.user.id = logged in user id
    const club = await Club.create({
      name,
      description,
      createdBy: req.user.id
    });

    // success response
    res.status(201).json(club);

  } catch (error) {
    res.status(500).json({ error: error.message });
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