const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

exports.createBooking = (req, res) => {
  const { type, scheduleId, passenger, seats } = req.body;

  if (!type || !['flight', 'bus'].includes(type.toLowerCase())) {
    return res.status(400).json({ success: false, message: "Field 'type' must be 'flight' or 'bus'." });
  }
  if (!scheduleId || !passenger || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'scheduleId', 'passenger' details (name, email), and an array of 'seats'."
    });
  }

  const category = type.toLowerCase() === 'flight' ? 'flights' : 'buses';
  const targetService = db[category].find(item => item.id === scheduleId);

  if (!targetService) {
    return res.status(404).json({ success: false, message: `${type} service with ID ${scheduleId} was not found.` });
  }

  const unavailableSeats = seats.filter(seat => !targetService.availableSeats.includes(seat));
  if (unavailableSeats.length > 0) {
    return res.status(409).json({
      success: false,
      message: `The following seat(s) are not available: ${unavailableSeats.join(', ')}`
    });
  }

  targetService.availableSeats = targetService.availableSeats.filter(s => !seats.includes(s));
  const totalPrice = targetService.price * seats.length;

  const newBooking = {
    bookingId: uuidv4(),
    type: type.toLowerCase(),
    scheduleId,
    passenger,
    seats,
    totalPrice,
    status: "CONFIRMED",
    bookedAt: new Date().toISOString()
  };

  db.bookings.push(newBooking);

  return res.status(201).json({
    success: true,
    message: "Booking confirmed successfully.",
    booking: newBooking
  });
};

exports.getBookingById = (req, res) => {
  const { bookingId } = req.params;
  const record = db.bookings.find(b => b.bookingId === bookingId);

  if (!record) {
    return res.status(404).json({ success: false, message: "Booking reference not found." });
  }

  return res.status(200).json({ success: true, data: record });
};

exports.cancelBooking = (req, res) => {
  const { bookingId } = req.params;
  const booking = db.bookings.find(b => b.bookingId === bookingId);

  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking reference not found." });
  }

  if (booking.status === "CANCELLED") {
    return res.status(400).json({ success: false, message: "Booking is already cancelled." });
  }

  const category = booking.type === 'flight' ? 'flights' : 'buses';
  const service = db[category].find(item => item.id === booking.scheduleId);
  if (service) {
    service.availableSeats.push(...booking.seats);
  }

  booking.status = "CANCELLED";
  booking.cancelledAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: "Booking cancelled and seats restored to pool.",
    data: booking
  });
};
