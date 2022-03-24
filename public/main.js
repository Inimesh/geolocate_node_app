// Check to see if geolocation via navigator browser API is possible
if ('geolocation' in navigator) {
  console.log('geolocation available');
  
  // Create un-tiled map using leaflet package
  var map = L.map('map').setView([51.505, -0.09], 13)

  // request server for Mapbox API key and load Mapbox tile styling
  fetch('/mapboxkey').then(res => {
    res.json().then(json => {
      const key = json.key
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${key}`, { // ENV variable
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(map);
    })
  })

  // Geolocate button click callback
  const geolocate = () => { 
    navigator.geolocation.getCurrentPosition(position => {
      // Client side
      // Get latitude/longitude data and timestamp
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const timestamp = position.timestamp;

      // Display data
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
      // Set marker on interactive map
      var marker = L.marker([lat, lon]).addTo(map)
      map.setView([lat, lon], 13)

      // Server side
      // Send lat/lon + timestamp data to server
      const data = {lat, lon, timestamp};
      const options = {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }
      fetch('/api', options).then(res => {
        res.json().then( json => console.log(json))
      });
    });
  }

  // Event listener for button
  document.getElementById("geolocate-btn").addEventListener("click", geolocate);
  
} else {
  console.log('geolocation not available');
}