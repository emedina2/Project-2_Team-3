var trace1 = {
    x: ['Australia', 'Canada', 'China', 'Egypt', 'Russia', 'UK', 'US'],
    y: [85.3, 84, 91.6, 98.9, 87.8, 77.8, 104.3],
    name: 'Max Temperatures 1995',
    type: 'bar'

  };
  
  var trace2 = {
    x: ['Australia', 'Canada', 'China', 'Egypt', 'Russia', 'UK', 'US'],
    y: [34.7, -18.4, 7.5, 50.5, 4, 30.9, -41.6],
    name: 'Min Temperatures 1995',
    type: 'bar'
  };
  
  var trace3 = {
    x: ['Australia', 'Canada', 'China', 'Egypt', 'Russia', 'UK', 'US'],
    y: [93.8, 77.5, 93.2, 96.1, 74.5, 83.4, 105.7],
    name: 'Max Temperatures 2019',
    type: 'bar'
  };

  var trace4 = {
    x: ['Australia', 'Canada', 'China', 'Egypt', 'Russia', 'UK', 'US'],
    y: [37.9, -16.8, 4.3, 50.9, 5.2, 31.4, -38.5],
    name: 'Min Temperatures 2019',
    type: 'bar'
  };

  var data = [trace1, trace2, trace3, trace4];
  
  var layout = {barmode: 'group'};
  
  Plotly.newPlot('myDiv', data, layout);