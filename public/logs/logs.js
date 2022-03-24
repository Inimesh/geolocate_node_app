const getData = () => {
  fetch('/api').then(res => {
    res.json().then(json => {
      displayData(json.data)
    });
  });
}

const displayData = (dataArr) => {
  const listContain = document.getElementById('datalist')
  for (item of dataArr) {
    const listElem = document.createElement('li');
    const lat = document.createElement('div');
    const lon = document.createElement('div');
    const timestamp = document.createElement('div');
    const linebreak = document.createElement('br');

    lat.textContent = `Latitude: ${item.lat}°`;
    lon.textContent = `Longitude: ${item.lon}°`;
    const dateString = new Date(item.timestamp).toLocaleString()
    timestamp.textContent = `Time: ${dateString}`;

    listElem.append(lat, lon, timestamp, linebreak);
    listContain.appendChild(listElem);
  }
}
getData()