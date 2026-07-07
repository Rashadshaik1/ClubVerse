const express = require("express");
const router = express.Router();

// Importing methods from controller structure block logic pointers
const {
  getClubBoards,
  createBoard,
  deleteBoard,
  syncMember,
  removeMember
} = require("../controllers/boardController");

const { protect } = require("../middlewares/authMiddleware"); // Mee global authorization protection lock hook middleware 

// --- Core Mapping Route Lines ---
router.get("/my-boards", protect, getClubBoards);
router.post("/", protect, createBoard);
router.delete("/:id", protect, deleteBoard);

// Member sub operations routing arrays
router.post("/sync-member", protect, syncMember);
router.delete("/remove-member/:boardId/:memberId", protect, removeMember);

module.exports = router;