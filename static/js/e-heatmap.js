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

//Circle Colors
function selectColor(value){
  if (value<10) {
    return "purple"
  }else if(value<30){
      return "blue"
  }else if(value<50){
      return "green"
  }else if(value<70){
      return "yellow"
  }else if(value<90){
      return "orange"
  }else if(value>=90){
      return "red"
  }
};

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
    // for (y = 1995; y < 2020; y++){
    //   for(m = 1; m < 13; m++){    
      var y =  1995;
      var m = 7;
        let filtered = response.filter(function (currentElement) {
          return currentElement.year === y && currentElement.month === m;
        })
        // console.log(filtered)
        var heatArray = [];
        for (var i = 0; i < filtered.length; i++) {
          if(filtered[i].latitude){
              // heatArray.push([ parseFloat(filtered[i].latitude),parseFloat(filtered[i].longitude)]);
              L.circle([parseFloat(filtered[i].latitude),parseFloat(filtered[i].longitude)], {
                weight:9,
                color: selectColor(filtered[i].month_avg_temp),
                fillColor: selectColor(filtered[i].month_avg_temp),
                fillOpacity: .5,
                radius: 5000
              }).bindPopup("<h3><b> Country: </b>" + filtered[i].country +"</h3> <hr>" + 
              "<p><b> City: </b>" + filtered[i].city + "</p>" +
              "<p><b> Year: </b>" +filtered[i].year + "</p>"+
              "<p><b> Temperature (F): </b>" + filtered[i].month_avg_temp + "</p>").addTo(myMap)
            }
          }
        
        // console.log(heatArray)  
        // var heat = L.heatLayer(heatArray, {
        //   radius: 50,
        //   blur: 15          

        // var heat = L.circle          
        // setTimeout(function(){
        //   myMap.addLayer(heat);
        // },50)
       // }
    // }
    //.addTo(myMap);
});

//create Legend
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake Depth</h4>";
  div.innerHTML += '<i style="background: chartreuse"></i><span>-10 - 10</span><br>';
  div.innerHTML += '<i style="background: greenyellow"></i><span>10 - 30</span><br>';
  div.innerHTML += '<i style="background: gold"></i><span>30 - 50</span><br>';
  div.innerHTML += '<i style="background: goldenrod"></i><span>50 - 70</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>70 - 90</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>> 90</span><br>';
  return div;
};