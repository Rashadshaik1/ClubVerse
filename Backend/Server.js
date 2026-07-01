const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const aiRoutes = require("./routes/aiRoutes"); // 👈 MOVE HERE

connectDB();

const app = express();

// middleware
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cors());

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/clubs", require("./routes/clubRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/registration", require("./routes/registrationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ================= AI ROUTE =================
app.use("/api/ai", aiRoutes); // 👈 HERE (IMPORTANT)

// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    msg: "Internal Server Error"
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});