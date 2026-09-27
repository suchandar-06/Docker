require('dotenv').config();
const express = require('express');
const cors = require('cors');

const searchRoutes = require('./src/routes/searchRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root landing endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    service: 'Bus and Flight Booking API',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      searchFlights: 'GET /api/search?type=flight&from=DEL&to=BOM',
      searchBuses: 'GET /api/search?type=bus&from=BLR&to=HYD',
      createBooking: 'POST /api/bookings',
      getBooking: 'GET /api/bookings/:bookingId',
      cancelBooking: 'DELETE /api/bookings/:bookingId'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Booking Engine' });
});

// Route middlewares
app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);

// Central error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Booking server is running on http://localhost:${PORT}`);
});
