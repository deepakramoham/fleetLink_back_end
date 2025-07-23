const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

const connectDBLocal = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fleetLink");
  } catch (err) {
    console.error("Error connectino to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = { connectDB, connectDBLocal };
