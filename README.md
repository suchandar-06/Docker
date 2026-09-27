# Bus & Flight Booking API Server

A RESTful booking backend engine built using Node.js and Express.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Or start for production:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/search?type=flight&from=DEL&to=BOM` - Search transport schedules
- `GET /api/search/:type/:id` - Get schedule details
- `POST /api/bookings` - Reserve seats and confirm booking
- `GET /api/bookings/:bookingId` - View confirmed booking
- `DELETE /api/bookings/:bookingId` - Cancel booking and return seats to pool
