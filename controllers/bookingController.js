const Vehicle = require("../model/Vehicle");
const Booking = require("../model/Booking");
const calculateDuration = require("../utils/rideCalculator");

const createBooking = async (req, res) => {
  const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

  if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
    return res.status(400).json({ message: "Insufficient data" });
  }
  const duration = calculateDuration(fromPincode, toPincode);
  const endTime = new Date(new Date(startTime).getTime() + duration * 3600000);

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

  const conflict = await Booking.findOne({
    vehicleId,
    startTime: { $lt: endTime },
    endTime: { $gt: new Date(startTime) },
  });

  if (conflict)
    return res.status(409).json({ error: "Vehicle already booked" });

  const booking = await Booking.create({
    vehicleId,
    fromPincode,
    toPincode,
    startTime,
    endTime,
    customerId,
  });

  res.status(201).json(booking);
};

module.exports = { createBooking };
