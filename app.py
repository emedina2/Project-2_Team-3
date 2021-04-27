import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return("index.html")