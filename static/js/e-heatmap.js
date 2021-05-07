var myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
  });
  
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
}).addTo(myMap);


var monthlyWeatherData = "/api/monthly";

// function to grab data for specific month & year
function filterMonthYear (data, m, y) {
  var results = [];
  results = data.filter(function(item) {
    return item.year === y && item.month === m
  });
};

d3.json(monthlyWeatherData).then(function(response) {
    // console.log(response);
    // var filtered = filterMonthYear(response, 1, 1995)
    // console.log(filtered)
    for (y = 1995; y < 2020; y++){
      for(m = 1; m < 13; m++){      
        let filtered = response.filter(function (currentElement) {
          return currentElement.year === y && currentElement.month === m;
        })
        // console.log(filtered)
        var heatArray = [];
        for (var i = 0; i < filtered.length; i++) {
          if(filtered[i].latitude){
          heatArray.push([ parseFloat(filtered[i].latitude),parseFloat(filtered[i].longitude), filtered[i].month_avg_temp]);
          }
        }
        console.log(heatArray)  
        var heat = L.heatLayer(heatArray, {
          radius: 50,
          blur: 15
          
        })
          
        setTimeout(function(){
          myMap.addLayer(heat);
        },50)
      }
    }
    //.addTo(myMap);
});
