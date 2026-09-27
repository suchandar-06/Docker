const inventory = {
  flights: [
    {
      id: "FL-101",
      carrier: "SkyWings",
      from: "DEL",
      to: "BOM",
      date: "2026-10-15",
      departureTime: "08:00",
      arrivalTime: "10:15",
      price: 4500,
      totalSeats: 60,
      availableSeats: ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B"]
    },
    {
      id: "FL-202",
      carrier: "AeroIndia",
      from: "BLR",
      to: "DEL",
      date: "2026-10-15",
      departureTime: "14:30",
      arrivalTime: "17:15",
      price: 5200,
      totalSeats: 60,
      availableSeats: ["4A", "4B", "5A", "5B", "6A", "6B"]
    }
  ],
  buses: [
    {
      id: "BUS-501",
      operator: "GreenLine Travels",
      busType: "AC Sleeper (2+1)",
      from: "BLR",
      to: "HYD",
      date: "2026-10-15",
      departureTime: "21:00",
      arrivalTime: "06:30",
      price: 1100,
      totalSeats: 30,
      availableSeats: ["L1", "L2", "L3", "U1", "U2", "U3"]
    },
    {
      id: "BUS-602",
      operator: "Orange Tours",
      busType: "Multi-Axle Scania Semi-Sleeper",
      from: "MUM",
      to: "GOA",
      date: "2026-10-15",
      departureTime: "22:15",
      arrivalTime: "08:00",
      price: 1350,
      totalSeats: 40,
      availableSeats: ["S1", "S2", "S3", "S4", "S5"]
    }
  ],
  bookings: []
};

module.exports = inventory;
