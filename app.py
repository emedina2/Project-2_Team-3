import sqlalchemy
import psycopg2
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy import create_engine, func
from login import login, password


from flask import Flask, render_template, redirect
engine = create_engine('postgresql://' + login + ":" + password + '@localhost:5432/WeatherData')
Base = automap_base()
Base.prepare(engine, reflect=True)


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")


@app.route("/Map")
def index():
    return render_template("index.html")



if __name__ == "__main__":
    app.run(debug=True)