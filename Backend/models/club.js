const mongoose = require("mongoose");

// Schema = structure of data in DB
const clubSchema = new mongoose.Schema({
  
  // Club name (example: Coding Club)
  name: {
    type: String,
    required: true
  },

  // Description about club
  description: {
    type: String,
    required: true
  },

  // Who created this club (user id from JWT)
  createdBy: {
    type: String
  }

}, { timestamps: true }); // adds createdAt, updatedAt automatically

// Export model so we can use in controller
module.exports = mongoose.model("Club", clubSchema);