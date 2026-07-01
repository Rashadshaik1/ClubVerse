const Registration = require("../models/Registration");


// ================= REGISTER EVENT =================
exports.registerEvent = async (req, res) => {
  try {

    // 🔒 STEP 1: Only students can register
    if (req.user.role !== "student") {
      return res.status(403).json({ msg: "Only students can register" });
    }

    // STEP 2: Get logged-in user id (from JWT)
    const userId = req.user.id;

    // STEP 3: Get eventId from frontend
    const { eventId } = req.body;

    // 🚫 STEP 4: Check duplicate registration
    // Same user should not register twice for same event
    const exists = await Registration.findOne({
      userId,
      eventId
    });

    if (exists) {
      return res.status(400).json({
        msg: "Already registered for this event"
      });
    }

    // STEP 5: Create new registration
    const reg = await Registration.create({
      userId,
      eventId
    });

    // STEP 6: Send response
    res.status(201).json({
      success: true,
      data: reg
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ================= GET MY REGISTRATIONS =================
exports.getMyRegs = async (req, res) => {
  try {

    // STEP 1: Get all registrations of logged-in user
    const regs = await Registration.find({
      userId: req.user.id
    })
      // 🔥 Replace eventId with full event details
      .populate("eventId")

      // 🔥 Replace userId with user details (only name & email)
      .populate("userId", "name email");

    // STEP 2: Send clean response
    res.json({
      success: true,
      data: regs
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};