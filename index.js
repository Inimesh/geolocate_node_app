const express = require('express');
const fs = require('fs');
require('dotenv').config();
const Datastore = require('nedb');
const port = 3000;

const app = express();
app.listen(port, () => { console.log("Server listening on port " + port) });
app.use(express.static('public'));
app.use(express.json());

// DATABASE --------------------------------------------------
const database = new Datastore('database.db');
database.loadDatabase();

// GET Requests --------------------------------------------------
app.get('/mapboxkey', (req, res) => {
  res.json({
    key: process.env.MAPBOX_API_KEY
  });
});

// POST Requests --------------------------------------------------
app.post('/api', (req, res) => {
  const data = req.body;

  // Adding to Database
  database.insert(data);
  console.log(`Database: ${database}`);

  // Saving to .csv file
  const content = Object.values(data).join(",") + "\n";
  fs.appendFile('./geo_data.csv', content, err => {
    if (err) {
      console.log(err);
      return
    }
  });

  // Response
  res.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
    timestamp: data.timestamp
  });
});

