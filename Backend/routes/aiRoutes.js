const express = require("express");
const router = express.Router();

// Controller import
const {
  chatWithAI,
  generateEventDescription,
} = require("../controllers/aiController");


// ===============================
// AI EVENT DESCRIPTION GENERATE
// ===============================
router.post("/generate-description", generateEventDescription);


// ===============================
// CHATBOT AI ROUTE
// ===============================
router.post("/chat", chatWithAI);


// Export router
module.exports = router;