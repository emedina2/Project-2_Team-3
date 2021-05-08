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
function selectColor(value) {
  if (value < 10) {
    return "purple"
  } else if (value < 30) {
    return "blue"
  } else if (value < 50) {
    return "teal"
  } else if (value < 70) {
    return "green"
  } else if (value < 90) {
    return "yellow"
  } else if (value < 95) {
    return "orange"
  } else if (value > 95) {
    return "red"
  }
};

function month(value) {
  if (value = 1) {
    return "January"
  } else if (value = 2) {
    return "February"
  } else if (value = 3) {
    return "March"
  } else if (value = 4) {
    return "April"
  } else if (value = 5) {
    return "May"
  } else if (value = 6) {
    return "June"
  } else if (value = 7) {
    return "July"
  } else if (value = 8) {
    return "August"
  } else if (value = 9) {
    return "September"
  } else if (value = 10) {
    return "October"
  } else if (value = 11) {
    return "November"
  } else if (value = 12) {
    return "December"
  }
};

// function to grab data for specific month & year
function filterMonthYear(data, m, y) {
  var results = [];
  results = data.filter(function (item) {
    return item.year === y && item.month === m
  });
};

d3.json(monthlyWeatherData).then(function (response) {
  // console.log(response);
  // var filtered = filterMonthYear(response, 1, 1995)
  // console.log(filtered)
  for (y = 1995; y < 2020; y++) {
    for (m = 1; m < 13; m++) {
      // var y = 1995;
      // var m = 7;
      let filtered = response.filter(function (currentElement) {
        return currentElement.year === y && currentElement.month === m;
      })
      // console.log(filtered)
      var heatArray = [];
      for (var i = 0; i < filtered.length; i++) {
        if (filtered[i].latitude) {
          // heatArray.push([ parseFloat(filtered[i].latitude),parseFloat(filtered[i].longitude)]);
          heatArray.push(L.circle([parseFloat(filtered[i].latitude), parseFloat(filtered[i].longitude)], {
            weight: 8,
            color: selectColor(filtered[i].month_avg_temp),
            fillColor: selectColor(filtered[i].month_avg_temp),
            fillOpacity: .8,
            radius: 500
          }).bindPopup("<h3><b> Location: </b>" + filtered[i].city + ", " + filtered[i].country + "</h3> <hr>" +
            "<p><b> Date: </b>" + month(filtered[i].month) + ", " + filtered[i].year + "</p>" +
            "<p><b> Temperature (F): </b>" + filtered[i].month_avg_temp + "</p>")
          )
        }
      }
      setTimeout(function () {
        var cityLayer = L.layerGroup(heatArray)
        myMap.addLayer(cityLayer)
      }, 50);
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

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Temperature Scale</h4>";
  div.innerHTML += '<i style="background: purple"></i><span> >10 </span><br>';
  div.innerHTML += '<i style="background: blue"></i><span>10 - 30</span><br>';
  div.innerHTML += '<i style="background: teal"></i><span>30 - 50</span><br>';
  div.innerHTML += '<i style="background: green"></i><span>50 - 70</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>70 - 90</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>> 90 - 95</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>> >95</span><br>';
  return div;
};
legend.addTo(myMap)