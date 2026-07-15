const express = require("express");
const router = express.Router();
const multer = require("multer");
const Registration = require("../models/Registration");


const { protect } = require("../middlewares/authMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  getMyEvents,
  getClubEvents,
  changeVenue,
  postponeEvent,
  cancelEvent,
  uploadGalleryImages,
  getGalleryImages,
  deleteGalleryImage,
  addFeedback,
  getEventRegistrations
} = require("../controllers/eventController");

const storage = multer.memoryStorage();

const upload = multer({
  storage
});


/* ================= CREATE EVENT ================= */

router.post(
  "/",
  protect,
  upload.fields([
    {
      name:"poster",
      maxCount:1
    },
    {
      name:"banner",
      maxCount:1
    }
  ]),
  createEvent
);



/* ================= CLUB EVENTS ================= */

// IMPORTANT:
// /my and /club/:clubId should come before /:id

router.get(
  "/my",
  protect,
  getMyEvents
);


router.get(
  "/club/:clubId",
  protect,
  getClubEvents
);



/* ================= EVENT UPDATE ACTIONS ================= */


// Change Venue

router.put(
  "/change-venue/:id",
  protect,
  changeVenue
);


// Postpone Event

router.put(
  "/postpone/:id",
  protect,
  postponeEvent
);


// Cancel Event


router.post(
  "/:id/cancel",
  protect,
  cancelEvent
);



/* ================= GET ALL EVENTS ================= */

router.get(
  "/",
  getEvents
);


/* ================= GET EVENT REGISTRATIONS ================= */

router.get(
  "/:id/registrations",
  protect,
  getEventRegistrations
);


/* ================= GET SINGLE EVENT ================= */

// Always keep this last

router.get(
  "/:id",
  getEventById
);
// ================= EVENT GALLERY =================

router.post(
  "/:id/gallery",
  protect,
  upload.array("images", 20),
  uploadGalleryImages
);

router.get(
  "/:id/gallery",
  getGalleryImages
);

router.delete(
  "/:eventId/gallery/:imageId",
  protect,
  deleteGalleryImage
);

//========== FeedBack =======
router.post(
  "/:id/feedback",
  protect,
  addFeedback
);


module.exports = router;