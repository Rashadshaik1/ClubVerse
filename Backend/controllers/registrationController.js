const Registration = require("../models/Registration");


// ================= REGISTER EVENT =================
exports.registerEvent = async (req, res) => {
  try {
    // req.user.id comes from JWT middleware
    const userId = req.user.id;

    // frontend sends eventId
    const { eventId } = req.body;

    // create registration
    const reg = await Registration.create({
      userId,
      eventId
    });

    res.status(201).json(reg);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ================= GET MY REGISTRATIONS =================
exports.getMyRegs = async (req, res) => {
  try {
    // find registrations of logged-in user
    const regs = await Registration.find({
      userId: req.user.id
    });

    res.json(regs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};