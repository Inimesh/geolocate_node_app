const express = require('express');
const fs = require('fs');
const app = express();

require('dotenv').config();
const port = 3000;

app.listen(port, () => { console.log("Server listening on port " + port) });

app.use(express.static('public'));
app.use(express.json());

app.get('/mapboxkey', (req, res) => {
  res.json({
    key: process.env.MAPBOX_API_KEY
  })
})

app.post('/api', (req, res) => {
  geoDataStore.push(req.body)
  console.log(geoDataStore);
  
  try {
    fd = fs.openSync('./geo_data.csv', 'a');
  } catch (error) {
    console.log(error);
  }

  const res_data = req.body;
  res.json({
    status: "success",
    latitude: res_data.lat,
    longitude: res_data.lon,
    timestamp: res_data.timestamp
  })
})


const geoDataStore = [];