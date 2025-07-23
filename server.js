require("dotenv").config();
const express = require("express");
const { connectDB, connectDBLocal } = require("./config/dbConn");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mongoose.connect("mongodb://localhost:27017/fleetlink");
connectDB();
//connectDBLocal();
app.use("/api/vehicles", require("./routes/vehicle"));
app.use("/api/bookings", require("./routes/booking"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
