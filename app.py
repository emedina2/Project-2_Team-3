import sqlalchemy
import psycopg2
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy import create_engine, func
from login import login, password
from flask import Flask, render_template, redirect



##DB connection
engine = create_engine('postgresql://' + login + ":" + password + '@localhost:5432/WeatherData')
Base = automap_base()
Base.prepare(engine, reflect=True)

##DB Table
Weather = Base.classes.weather

## set data from Postgres as variable to send to app.js ##
# Africa = session.query()


## Flask App ##
app = Flask(__name__)



@app.route("/")
def home():
    session = Session(engine)
    return render_template("home.html")


@app.route("/Map")
def index():
    weatherdata = session.query(Weather).limit(10).all()
    session.close()
    print('data is: {weatherdata}')
    return render_template("index.html", weatherdata = weatherdata)



if __name__ == "__main__":
    app.run(debug=True)