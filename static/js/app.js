var myMap = L.map("map", {
    center: [45, -100],
    zoom: 3
  });
  
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: 1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
}).addTo(myMap);


var monthlyWeatherData = "/api/monthly";


d3.json(monthlyWeatherData).then(function(response) {
    console.log(response);
    var heatArray = [];
    for (var i = 0; i < response.length; i++) {
      heatArray.push([parseFloat(response[i].latitude), parseFloat(response[i].longitude)]);
      }
    console.log(heatArray)    
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
});
