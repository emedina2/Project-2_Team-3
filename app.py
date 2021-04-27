import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from login import login, password

from flask import Flask, render_template
engine = ("postgresql://login:password@localhost:60921/WeatherData")
Base = automap_base()
Base.prepare(engine, reflect=True)


app = Flask(__name__)

@app.route("/")
def index():
    return("index.html")