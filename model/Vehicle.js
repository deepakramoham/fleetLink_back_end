const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema({
  name: String,
  capacityKg: Number,
  tyres: Number,
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
