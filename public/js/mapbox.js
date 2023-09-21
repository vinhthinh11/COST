/* eslint-disable */

export const displayMap = function () {
  const locations = document.getElementById('map').dataset.locations;
  const coordinate = JSON.parse(locations).map(el => el.coordinates);
  const map = L.map('map');
  coordinate.forEach((element, i) => {
    map.setView([element[1], element[0]], 7);
    const marker = L.marker([element[1], element[0]])
      .bindPopup(`This is the <b>${i + 1}</b> destination!`)
      .openPopup()
      .addTo(map);
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);

  const currnet = function (position) {
    const popup = L.popup();
    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      console.log(e.latlng);
    }

    map.on('click', onMapClick);
  };
};
