const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {

  registerEvent,

  getMyRegs,

  getEventRegistrations

} = require("../controllers/registrationController");


// ================= REGISTER FOR EVENT =================

router.post(

  "/",

  protect,

  registerEvent

);


// ================= GET MY REGISTRATIONS =================

router.get(

  "/",

  protect,

  getMyRegs

);


// ================= GET EVENT REGISTRATIONS =================

router.get(

  "/event/:eventId",

  protect,

  getEventRegistrations

);


module.exports = router;