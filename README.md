# Project-2_Team-3
Project 2

The static folder contains the files for our project.

Within the main folder, app.py runs our Flask app that allows the web pages to load.

Within app.py there is an import of login.py, which has been added to our git ignore, as it contains the login credentials for each of our Postgres/PGAdmin databases.

Our data was loaded into Postgres using the csv downloaded from https://www.kaggle.com/sudalairajkumar/daily-temperature-of-major-cities. The data was then cleaned to remove invalid values (-99) within the average temperature column, then a table was created to aggregate the average temperature for each month of each year, for each individual city.

The data from the kaggle dataset did not contain latitude/longitude information, so that was pulled in partially using the openweathermap API (which you can see commented out within the app.py file). Not all cities were found using this API, so the remaining city lat/long were manually added by grabbing the data from Google Maps. 

The table containing lat/lng for each city was joined with the weather aggregate data table & the combined table was then loaded in to app.py & converted into a JSON object, which could then be read into our Javascript file (e-heatmap.js) in order to generate our "heat map". 

A config.js file has been created locally, but added to our gitignore, as that contains the API key for the mapbox API & is used within e-heatmap.js to generate the map.

The other js files within data/js are used for the following:
- app1.js is the AOS (Animate on Scroll) Javascript library, which is used to animate our images within the homepae (Dashboard.html)
-application.js is the line graph visualizations used within Graphs.html
-leaflet-heat.js is the leaflet hetamap Javascript library that was attempted to be used, but did not work to visualize the data as we had hoped.

Within the data folder are 2 csv files loaded in to the app1.js file to display the intended line graph visualizations.








