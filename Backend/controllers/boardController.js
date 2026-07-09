const Board = require("../models/Board");

// 1. GET ALL BOARDS FOR THE LOGGED-IN CLUB
exports.getClubBoards = async (req, res) => {
  try {
    // ✅ FIX: Changed req.club.id to req.user._id
    const clubId = req.user?._id;
    
    if (!clubId) {
      return res.status(400).json({ success: false, message: "Club authentication missing" });
    }

    const boards = await Board.find({ clubId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: boards });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching boards" });
  }
};

// 2. CREATE A NEW ACADEMIC COMMITTEE BOARD PANEL
exports.createBoard = async (req, res) => {
  try {
    const { academicYear } = req.body;
    const clubId = req.user?._id; // ✅ FIX

    if (!clubId) {
      return res.status(400).json({ success: false, message: "Club authentication missing" });
    }
    
    const existing = await Board.findOne({ clubId, academicYear });
    if (existing) {
      return res.status(400).json({ success: false, message: "Board already exists for this academic year" });
    }

    const newBoard = new Board({
      clubId,
      academicYear,
      members: []
    });

    await newBoard.save();
    res.status(201).json({ success: true, board: newBoard });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error creating board" });
  }
};

// 3. WIPE OUT ENTIRE TARGET BOARD COMMITTEE
exports.deleteBoard = async (req, res) => {
  try {
    const clubId = req.user?._id; // ✅ FIX
    const board = await Board.findOneAndDelete({ _id: req.params.id, clubId });
    
    if (!board) return res.status(404).json({ success: false, message: "Board not found" });
    res.status(200).json({ success: true, message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failure executing delete" });
  }
};

// 4. SYNC INTEGRATE MEMBER ACTIONS (ADD OR UPDATE TO TARGET BOARD)
exports.syncMember = async (req, res) => {
  try {
    const { boardId, memberId, name, branch, year, position, photo } = req.body;
    const clubId = req.user?._id; // ✅ FIX

    const board = await Board.findOne({ _id: boardId, clubId });
    if (!board) return res.status(404).json({ success: false, message: "Board layout not found" });

    if (memberId) {
      // EDIT MODE OPERATION
      const member = board.members.id(memberId);
      if (member) {
        member.name = name;
        member.branch = branch;
        member.year = year;
        member.position = position;
        if (photo) member.photo = photo;
      }
    } else {
      // ADD NEW MEMBER
      board.members.push({ name, branch, year, position, photo });
    }

    await board.save();
    res.status(200).json({ success: true, data: board });
  } catch (error) {
    res.status(500).json({ success: false, message: "Operational processing failure" });
  }
};

// 5. REMOVE A SINGLE MEMBER SUB-ELEMENT OUT OF A COMMITTEE BOARD
exports.removeMember = async (req, res) => {
  try {
    const clubId = req.user?._id; // ✅ FIX
    const board = await Board.findOne({ _id: req.params.boardId, clubId });
    if (!board) return res.status(404).json({ success: false, message: "Board context not found" });
    
    board.members.pull({ _id: req.params.memberId });
    await board.save();
    
    res.status(200).json({ success: true, data: board });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed deletion processing" });
  }
};
// GET MEMBERS COUNT FOR A SPECIFIC CLUB (ADMIN)
exports.getClubMemberCount = async (req,res)=>{
  try{

    const clubId = req.params.clubId;

    const boards = await Board.find({clubId});


    let count = 0;

    boards.forEach((board)=>{
      count += board.members.length;
    });


    res.status(200).json({
      success:true,
      count
    });


  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Error fetching member count"
    });

  }
};