
var myMap = L.map("myMap").setView([0, 0], 2);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    var heatData = [];


    data.features.forEach(function(feature) {
      var lat = feature.geometry.coordinates[1];
      var lon = feature.geometry.coordinates[0];
      // console.log(lon)
      // var depth = feature.properties.depth;


      heatData.push([lat, lon]);
    });


    var heat = L.heatLayer(heatData, {
      radius: 50,
      blur: 5,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' } 
    });


    heat.addTo(myMap);
  });
