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

// Base health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Booking Engine' });
});

// App routes
app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);

// Fallback error middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Booking server is running on http://localhost:${PORT}`);
});
