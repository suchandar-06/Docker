const express = require('express');
const router = express.Router();
const { createBooking, getBookingById, cancelBooking } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/:bookingId', getBookingById);
router.delete('/:bookingId', cancelBooking);

module.exports = router;
