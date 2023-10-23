# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request, jsonify, Blueprint

import numpy as np
import pandas as pd

import pickle

import os
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app
from api.index import example
from api.auth import authentication
from flask_ngrok import run_with_ngrok

# from api.predict import predict_blueprint
from flask_cors import CORS, cross_origin
load_dotenv()
# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
run_with_ngrok(app)
# app.register_blueprint(predict_blueprint)
app.register_blueprint(example)
app.register_blueprint(authentication)


cred = credentials.Certificate('keys.json')
default_app = initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(example)
app.register_blueprint(authentication)




# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
@cross_origin(supports_credentials=True)
def hello_world():
		response_body = {
        "name": "The Boys",
        "about": "WE ARE HERE TO KILL"
    }
		return response_body


# main driver function
if __name__ == '__main__':
		# run() method of Flask class runs the application
		# on the local development server.
		app.run(port=80)
