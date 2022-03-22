const express = require('express');
const app = express();

const port = 3000;

app.listen(port, () => { console.log("Server listening on port " + port) });

app.use(express.static('public'));
app.use(express.json());


app.post('/api', (req, res) => {
  console.log(req.body);
  const res_data = req.body;
  res.json({
    status: "success",
    latitude: res_data.lat,
    longitude: res_data.lon
  })
})