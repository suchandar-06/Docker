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

// Root endpoint: Visual Interactive UI Dashboard
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Server Dashboard</title>
      <style>
        * { box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          background: #0f172a; 
          color: #f8fafc; 
          padding: 40px 20px; 
          margin: 0; 
        }
        .container { 
          max-width: 850px; 
          margin: 0 auto; 
          background: #1e293b; 
          border-radius: 14px; 
          padding: 32px; 
          box-shadow: 0 10px 25px rgba(0,0,0,0.3); 
          border: 1px solid #334155; 
        }
        .badge { 
          background: #10b981; 
          color: #fff; 
          font-size: 12px; 
          font-weight: 700; 
          padding: 5px 12px; 
          border-radius: 9999px; 
          display: inline-block; 
          margin-bottom: 12px; 
        }
        h1 { margin: 0 0 8px 0; font-size: 26px; }
        p { color: #94a3b8; margin: 0 0 24px 0; }
        .endpoint-card { 
          background: #0f172a; 
          border: 1px solid #334155; 
          border-radius: 8px; 
          padding: 14px 18px; 
          margin-bottom: 12px; 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
        }
        .left-col { display: flex; align-items: center; gap: 12px; }
        .method { 
          font-weight: 700; 
          font-size: 12px; 
          padding: 4px 8px; 
          border-radius: 4px; 
          min-width: 55px; 
          text-align: center; 
        }
        .get { background: #0284c7; color: white; }
        .post { background: #16a34a; color: white; }
        .delete { background: #dc2626; color: white; }
        .url { font-family: monospace; font-size: 14px; color: #e2e8f0; }
        .btn { 
          background: #3b82f6; 
          color: white; 
          border: none; 
          text-decoration: none; 
          padding: 6px 14px; 
          border-radius: 6px; 
          font-size: 13px; 
          font-weight: 500; 
          cursor: pointer; 
        }
        .btn:hover { background: #2563eb; }
        .desc { font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="badge">● Server Online</span>
        <h1>Bus & Flight Booking Engine</h1>
        <p>Your backend API is operational. Click any GET endpoint below to inspect responses live:</p>

        <div class="endpoint-card">
          <div class="left-col">
            <span class="method get">GET</span>
            <span class="url">/api/health</span>
          </div>
          <a class="btn" href="/api/health" target="_blank">Run Query</a>
        </div>

        <div class="endpoint-card">
          <div class="left-col">
            <span class="method get">GET</span>
            <span class="url">/api/search?type=flight</span>
          </div>
          <a class="btn" href="/api/search?type=flight" target="_blank">Search Flights</a>
        </div>

        <div class="endpoint-card">
          <div class="left-col">
            <span class="method get">GET</span>
            <span class="url">/api/search?type=bus</span>
          </div>
          <a class="btn" href="/api/search?type=bus" target="_blank">Search Buses</a>
        </div>

        <div class="endpoint-card">
          <div class="left-col">
            <span class="method post">POST</span>
            <span class="url">/api/bookings</span>
          </div>
          <span class="desc">Send payload via Postman / frontend fetch</span>
        </div>

        <div class="endpoint-card">
          <div class="left-col">
            <span class="method delete">DELETE</span>
            <span class="url">/api/bookings/:bookingId</span>
          </div>
          <span class="desc">Cancels booking & restores seats</span>
        </div>
      </div>
    </body>
    </html>
  `);
});

// App endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Booking Engine' });
});

app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);

// Error middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Booking server is running on port ${PORT}`);
});
