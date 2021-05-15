
//1995 Plot
// static/data/data1995.csv
Plotly.d3.csv('static/data/data1995.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

var allCountryNames = unpack(rows, 'country'),
    allYear = unpack(rows, 'month'),
    allTemp = unpack(rows, 'avgtemperature'),
    listofCountries = [],
    currentCountry,
    currentTemp = [],
    currentYear = [];
    console.log(allTemp)
    for (var i = 0; i < allCountryNames.length; i++ ){
    if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
        listofCountries.push(allCountryNames[i]);
    }
    }
    
    function getCountryData(chosenCountry) {
    currentTemp = [];
    currentYear = [];
    for (var i = 0 ; i < allCountryNames.length ; i++){
        if ( allCountryNames[i] === chosenCountry ) {
        currentTemp.push(allTemp[i]);
        currentYear.push(allYear[i]);
        } 
    }
    };

// Default Country Data
setBubblePlot('US');
    
function setBubblePlot(chosenCountry) {
    getCountryData(chosenCountry);  

    var trace1 = {
        x: currentYear,
        y: currentTemp,
        mode: 'lines+markers',
        marker: {
        size: 12, 
        opacity: 0.5
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Year 1995: Temperature according to Country<br>'+ chosenCountry,
        xaxis: {
            title: "Month of the year (1 = Jan, 2 = Feb, etc.)"
        },
        yaxis: {
            title: "Temperature (Farenheight)"
        }
    };

    Plotly.newPlot('plotdiv1', data, layout, {showSendToCloud: true});
};
    
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    countrySelector = innerContainer.querySelector('.countrydata');

function assignOptions(textArray, selector) {
    for (var i = 0; i < textArray.length;  i++) {
        var currentOption = document.createElement('option');
        currentOption.text = textArray[i];
        selector.appendChild(currentOption);
    }
}

assignOptions(listofCountries, countrySelector);

function updateCountry(){
    setBubblePlot(countrySelector.value);
}
    
countrySelector.addEventListener('change', updateCountry, false);
});


//2019 Plot
Plotly.d3.csv('../static/data/data2019.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

var allCountryNames = unpack(rows, 'country'),
    allYear = unpack(rows, 'month'),
    allTemp = unpack(rows, 'avgtemperature'),
    listofCountries = [],
    currentCountry,
    currentTemp = [],
    currentYear = [];
    console.log(allTemp)
    for (var i = 0; i < allCountryNames.length; i++ ){
    if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
        listofCountries.push(allCountryNames[i]);
    }
    }
    
    function getCountryData(chosenCountry) {
    currentTemp = [];
    currentYear = [];
    for (var i = 0 ; i < allCountryNames.length ; i++){
        if ( allCountryNames[i] === chosenCountry ) {
        currentTemp.push(allTemp[i]);
        currentYear.push(allYear[i]);
        } 
    }
    };

// Default Country Data
setBubblePlot('US');
    
function setBubblePlot(chosenCountry) {
    getCountryData(chosenCountry);  

    var trace1 = {
        x: currentYear,
        y: currentTemp,
        mode: 'lines+markers',
        marker: {
        size: 12, 
        opacity: 0.5
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Year 2019: Temperature according to Country<br>'+ chosenCountry,
        xaxis: {
            title: "Month of the year (1 = Jan, 2 = Feb, etc.)"
        },
        yaxis: {
            title: "Temperature (Farenheight)"
        }
    };

    Plotly.newPlot('plotdiv2', data, layout, {showSendToCloud: true});
};
    
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    countrySelector = innerContainer.querySelector('.countrydata');

function assignOptions(textArray, selector) {
    for (var i = 0; i < textArray.length;  i++) {
        var currentOption = document.createElement('option');
        currentOption.text = textArray[i];
        selector.appendChild(currentOption);
    }
}

// assignOptions(listofCountries, countrySelector);

function updateCountry(){
    setBubblePlot(countrySelector.value);
}
    
countrySelector.addEventListener('change', updateCountry, false);
});