const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth",require("./routes/authRoutes"));

//server
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`);
});
app.use("/api/clubs", require("./routes/clubRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/registration", require("./routes/registrationRoutes"));