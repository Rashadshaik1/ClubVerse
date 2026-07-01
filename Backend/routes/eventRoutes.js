const express = require("express");
const router = express.Router();
const multer = require("multer");

const { protect } = require("../middlewares/authMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  getMyEvents,
  getClubEvents
} = require("../controllers/eventController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================= CREATE EVENT ================= */
router.post(
  "/",
  protect,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  createEvent
);

/* ================= FIX ORDER (IMPORTANT) ================= */

// 👇 THESE MUST COME BEFORE /:id

router.get("/my", protect, getMyEvents);

router.get("/club/:clubId", protect, getClubEvents);

/* ================= NORMAL ROUTES ================= */
router.get("/", getEvents);

/* ================= SINGLE EVENT (LAST) ================= */
router.get("/:id", getEventById);

module.exports = router;