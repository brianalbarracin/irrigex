console.log("MapaContactenos.js cargado");

var mapContainer = document.getElementById('map2');
if (!mapContainer) {
  console.error("El contenedor del mapa no se encontró");
} else {
  var map = L.map('map2').setView([4.67620, -74.13489], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([4.67620, -74.13489]).addTo(map)
    .bindPopup('Nuestra Ubicación')
    .openPopup();
}