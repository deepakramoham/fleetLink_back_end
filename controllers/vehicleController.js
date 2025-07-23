const Vehicle = require("../model/Vehicle");
const Booking = require("../model/Booking");
const calculateDuration = require("../utils/rideCalculator");

const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ message: "Insufficient data" });
    }
    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const availableVehicles = async (req, res) => {
  const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

  if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
    return res.status(400).json({ message: "Bad request" });
  }

  const duration = calculateDuration(fromPincode, toPincode);
  const endTime = new Date(new Date(startTime).getTime() + duration * 3600000);

  const allVehicles = await Vehicle.find({
    capacityKg: { $gte: capacityRequired },
  });

  const bookings = await Booking.find({
    startTime: { $lt: endTime },
    endTime: { $gt: new Date(startTime) },
  });

  const bookedIds = bookings.map((b) => b.vehicleId.toString());
  const available = allVehicles.filter(
    (v) => !bookedIds.includes(v._id.toString())
  );

  res
    .status(200)
    .json({ vehicles: available, estimatedRideDurationHours: duration });
};

module.exports = { addVehicle, availableVehicles };
