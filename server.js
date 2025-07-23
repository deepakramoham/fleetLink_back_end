const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/fleetlink");

app.use("/api/vehicles", require("./routes/vehicle"));
app.use("/api/bookings", require("./routes/booking"));

app.listen(5000, () => console.log("Server running on port 5000"));
