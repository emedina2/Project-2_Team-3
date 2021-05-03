import sqlalchemy
import psycopg2
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy import create_engine, func, inspect, Table, MetaData, Column, String, update
from login import login, password
from flask import Flask, render_template, redirect, jsonify
from geopy.geocoders import Nominatim



##DB connection
engine = create_engine('postgresql://' + login + ":" + password + '@localhost:5432/WeatherData')
Base = automap_base()
metadata = MetaData()
weather = Table('weather',metadata, Column('ID', String, primary_key=True), autoload=True, autoload_with=engine)
locations = Table('locations',metadata, Column('city_state_country', String, primary_key=True), autoload=True, autoload_with=engine)
Base.prepare(engine, reflect=True)


##DB Table
Weather = Base.classes.weather
Locations = Base.classes.locations
session = Session(engine)
# print(Weather)
# print(engine.table_names())
# print(Locations)

## set data from Postgres as variable to send to app.js ##

## Get Lat/LNG for cities
geolocation = Nominatim(user_agent="Eric_M")
cities = session.query(Locations.city).all()
countries = session.query(Locations.country).all()


for x in range(len(cities)):
    city = cities[x][0]
    country = countries[x][0]
    print(city)
    print(country)
    city_country = city + ',' + country
    coordinates = geolocation.geocode(city_country)
    latitude = coordinates.latitude
    longitude = coordinates.longitude
    print(f'latitude: {latitude} longitude: {longitude}')




session.close()
## Flask App ##
app = Flask(__name__)

@app.route("/")
def home():
    
    return render_template("home.html")


@app.route("/Map")
def index():
    
    weatherdata = session.query(Weather).limit(10).all()
    session.close()
    print('data is: {weatherdata}')
    return render_template("index.html", weatherdata = weatherdata)

if __name__ == "__main__":
    app.run(debug=True)