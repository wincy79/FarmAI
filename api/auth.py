from flask import Blueprint, request, jsonify
from firebase_admin import auth, firestore,credentials,initialize_app
import app
import uuid
from flask_cors import CORS, cross_origin


authentication = Blueprint('authentication', __name__)
# db = firestore.client()
# user_ref = db.collection('users')




@authentication.route('/signup',methods=['POST'])
@cross_origin(supports_credentials=True)
def signup():
        body=request.get_json()
        # user = auth.create_user(
        #   email='user@example.com',
        #   email_verified=False,
        #   phone_number='+15555550100',
        #   password='secretPassword',
        #   display_name='John Doe',
        #   photo_url='http://www.example.com/12345678/photo.png',
        #   disabled=False)
        # print(uuid.uuid4(),'asd')
        try:
          id = str(uuid.uuid4())
          user_ref=app.db.collection('users')
          user_ref.document(id).set({"name":body['username'],"number":body['number'], "_id":id, "predictions":[],"fertilizers":[]})
          return jsonify({"success": True}), 200
        except Exception as e:
          return f"An Error Occurred: {e}"


@authentication.route('/login',methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
        try:
          body=request.get_json()
          id = str(uuid.uuid4())
          user_ref=app.db.collection('users')
          query = user_ref.where(u'number', u'==',body['number'] ).stream()
          for document in query:
              user=document.to_dict()
          return jsonify({"success": True,"user":user}), 200
        except Exception as e:
          return f"An Error Occurred: {e}"


