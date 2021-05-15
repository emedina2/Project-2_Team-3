var myMap = L.map("map", {
  center: [0, 0],
  zoom: 3
});
var yearDropDown = document.getElementById("year");
var monthDropDown = document.getElementById("month");
var selectedYear = []
yearDropDown.addEventListener("change", function () {
  console.log(this.value);
  selectedYear = this.value
})
var selectedMonth =
  monthDropDown.addEventListener("change", function () {
    // console.log(this.value)
    selectedMonth = this.value
  })
var button = document.getElementById("#button");

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
  if (value == 1) {
    return "January"
  } else if (value == 2) {
    return "February"
  } else if (value == 3) {
    return "March"
  } else if (value == 4) {
    return "April"
  } else if (value == 5) {
    return "May"
  } else if (value == 6) {
    return "June"
  } else if (value == 7) {
    return "July"
  } else if (value == 8) {
    return "August"
  } else if (value == 9) {
    return "September"
  } else if (value == 10) {
    return "October"
  } else if (value == 11) {
    return "November"
  } else if (value == 12) {
    return "December"
  }
};
var heatArray = [];
var data = []
var cityLayer = []
function init() {
  d3.json(monthlyWeatherData).then(function (response) {
    console.log(response);
    console.log(filtered)

    let filtered = response.filter(function (currentElement) {
      return currentElement.year === 1995 && currentElement.month === 1;
    })
    // console.log(filtered)

    for (var i = 0; i < filtered.length; i++) {
      var selectedColor = selectColor(filtered[i].month_avg_temp)
      // console.log(selectedColor)
      if (filtered[i].latitude) {
        // heatArray.push([ parseFloat(filtered[i].latitude),parseFloat(filtered[i].longitude)]);
        // console.log([parseFloat(filtered[i].latitude), parseFloat(filtered[i].longitude)])
        heatArray.push(L.circle([parseFloat(filtered[i].latitude), parseFloat(filtered[i].longitude)], {
          weight: 8,
          color: selectedColor,
          fillColor: selectedColor,
          fillOpacity: .8,
          radius: 500
        }).bindPopup("<h3><b> Location: </b>" + filtered[i].city + ", " + filtered[i].country + "</h3> <hr>" +
          "<p><b> Date: </b>" + month(filtered[i].month) + ", " + filtered[i].year + "</p>" +
          "<p><b> Temperature (F): </b>" + filtered[i].month_avg_temp + "</p>")
        )
      }
    }
    cityLayer = L.layerGroup(heatArray)
    myMap.addLayer(cityLayer)
  })
};



function updateMap() {
  myMap.removeLayer(cityLayer)
  // console.log(selectedYear + ", " + selectedMonth)
  d3.json(monthlyWeatherData).then(function (response) {
    console.log(response)
    let filtered = response.filter(function (currentElement) {
      return currentElement.year === parseInt(selectedYear) && currentElement.month === parseInt(selectedMonth);
    })
    console.log(filtered)
    heatArray = [];
    for (var i = 0; i < filtered.length; i++) {
      var selectedColor = selectColor(filtered[i].month_avg_temp)
      console.log([parseFloat(filtered[i].latitude), parseFloat(filtered[i].longitude)])
      if (filtered[i].latitude) {
        heatArray.push(L.circle([parseFloat(filtered[i].latitude), parseFloat(filtered[i].longitude)], {
          weight: 8,
          color: selectedColor,
          fillColor: selectedColor,
          fillOpacity: .8,
          radius: 500
        }).bindPopup("<h3><b> Location: </b>" + filtered[i].city + ", " + filtered[i].country + "</h3> <hr>" +
          "<p><b> Date: </b>" + month(filtered[i].month) + ", " + filtered[i].year + "</p>" +
          "<p><b> Temperature (F): </b>" + filtered[i].month_avg_temp + "</p>")
        )
      }
    }
    cityLayer = L.layerGroup(heatArray)
    myMap.addLayer(cityLayer)
  });
};

document.getElementById("button").addEventListener('click', updateMap)

init();

//create Legend
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Temperature Scale</h4>";
  div.innerHTML += '<i style="background: purple"></i><span> <10 </span><br>';
  div.innerHTML += '<i style="background: blue"></i><span>10 - 30</span><br>';
  div.innerHTML += '<i style="background: teal"></i><span>30 - 50</span><br>';
  div.innerHTML += '<i style="background: green"></i><span>50 - 70</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>70 - 90</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>> 90 - 95</span><br>';
  div.innerHTML += '<i style="background: red"></i><span> >95</span><br>';
  return div;
};
legend.addTo(myMap)