from flask import Blueprint
from flask import Blueprint
from flask import request, jsonify, Markup
from datetime import datetime
import numpy as np
import pandas as pd
import pickle
from utils.fertilizer import fertilizer_dic
from flask_cors import CORS, cross_origin
import app

example = Blueprint('example', __name__)


crop_recommendation_model_path = 'models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))


@example.route('/predictions',methods=["POST"])
@cross_origin(supports_credentials=True)
def index():
    body=request.get_json()
    print(body,'asfa')

    # final_features = [np.array([104,18, 30, 23.603016, 60.3, 6.7, 140.91 ])]
    final_features = [np.array([body["N"],body["P"], body["K"],body["temperature"], body["humidity"], body['ph'], body['rainfall'] ])]

    prediction = crop_recommendation_model.predict(final_features)
    output = prediction[0]

    N = final_features[0][0]
    print(N)
    P = final_features[0][1]
    print(P)
    K = final_features[0][2]
    print(K)



    df = pd.read_csv('Data/fertilizer.csv')
    nr = df[df['Crop'] == output]['N'].iloc[0]
    pr = df[df['Crop'] == output]['P'].iloc[0]
    kr = df[df['Crop'] == output]['K'].iloc[0]

    n = nr - N
    p = pr - P
    k = kr - K
    temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
    max_value = temp[max(temp.keys())]
    if max_value == "N":
        if n < 0:
            key = 'NHigh'
        else:
            key = "Nlow"
    elif max_value == "P":
        if p < 0:
            key = 'PHigh'
        else:
            key = "Plow"
    else:
        if k < 0:
            key = 'KHigh'
        else:
            key = "Klow"

    response = Markup(str(fertilizer_dic[key]))

    # user_ref = app.db.collection('users').where(u'number', u'==', body['number']).stream()
    # for i in user_ref:
    #     array=i.to_dict()
    #     i.reference.update({"predictions":[{"date":datetime.today().strftime('%Y-%m-%d'), "crop_predictions":output, "fertilizer":response,"N":body["N"],"P":body["P"],"K":body["K"],"temperature":body["temperature"],"humidity":body["humidity"],"ph":body['ph'],"rainfall":body['rainfall']}]}) # get the document reference and use it to update\delete ...
    return jsonify({"prediction": output, "fertilizer": response,})
    # return "This is an example app"



