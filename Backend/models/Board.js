const mongoose = require("mongoose");

// Combined Board & Members Schema for simple management
const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  position: { type: String, required: true },
  photo: { type: String, default: "" } // Base64 or Image URL string tracking
});

const BoardSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  academicYear: { type: String, required: true },
  members: [MemberSchema] // Array nested inside the specific board
}, { timestamps: true });

module.exports = mongoose.model("Board", BoardSchema);