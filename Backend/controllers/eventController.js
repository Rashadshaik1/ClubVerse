const Event = require("../models/Event");


// ================= CREATE EVENT =================
exports.createEvent = async (req, res) => {
  try {
    // Frontend nunchi data vastundi
    const { title, description, date, venue, clubId } = req.body;

    // DB lo event create chestunnam
    const event = await Event.create({
      title,
      description,
      date,
      venue,
      clubId
    });

    // success response
    res.status(201).json(event);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ================= GET ALL EVENTS =================
exports.getEvents = async (req, res) => {
  try {
    // anni events fetch chestunnam
    const events = await Event.find();

    res.json(events);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ================= GET SINGLE EVENT =================
exports.getEventById = async (req, res) => {
  try {
    // URL lo unna id use chestunnam
    const event = await Event.findById(req.params.id);

    res.json(event);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};