import sqlalchemy
import psycopg2
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy import create_engine, func, inspect, Table, MetaData, Column, String, update
from login import login, password, api_key
from flask import Flask, render_template, redirect, jsonify
import requests
import json



##DB connection
engine = create_engine('postgresql://' + login + ":" + password + '@localhost:5432/WeatherData')
Base = automap_base()
metadata = MetaData()
weather = Table('weather',metadata, Column('ID', String, primary_key=True), autoload=True, autoload_with=engine)
locations = Table('locations',metadata, Column('city_state_country', String, primary_key=True), autoload=True, autoload_with=engine)
Base.prepare(engine, reflect=True)


##DB Table
Locations = Base.classes.locations
session = Session(engine)
# print(Weather)
# print(engine.table_names())
# print(Locations)

## set data from Postgres as variable to send to app.js ##

## Get Lat/LNG for cities
# apikey = api_key
# url = "http://api.openweathermap.org/geo/1.0/direct?appid={apikey}&result=1&q=" 
# cities = session.query(Locations.city).all()
# countries = session.query(Locations.country).all()
# city_id = session.query(Locations.id).all()
# pk = session.query(Locations.city_state_country)

# for x in range(len(cities)):
#     csc = pk[x][0]
#     query = url + csc
#     coords = session.query(Locations).get(csc)
#     city = cities[x][0]
#     country = countries[x][0]
#     try:
#         results = requests.get(query).json()
#         print(results[0])
#         coords.longitude = results[0]['lon']
#         coords.latitude = results[0]['lat']
#         session.commit()
#         print(f'{city},{country} coordinates are retrieved')
#     except Exception as e:
#         print(e)

# session.close()
## Flask App ##
app = Flask(__name__)

@app.route("/")
def home():
    
    return render_template("home.html")

@app.route("/api")
def getdata():

    weather_data = [{
        "city": city,
        "year": year,
        "month": month,
        "average_temp": average_temp,
        "latitude" : latitude,
        "longitude" : longitude
    }]
    return jsonify(weather_data)

@app.route("/Graphs")
def showgraphs():
    return render_template("visualizations.html")

@app.route("/Map")
def index():
    
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)