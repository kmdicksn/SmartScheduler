from pymongo import MongoClient
from flask import Flask, jsonify, request, make_response
import requests

app = Flask(__name__)

client = MongoClient("mongodb+srv://admin:notadmin@banban.dqizue2.mongodb.net/?retryWrites=true&w=majority")
db = client["users"]
collection = db["users"]

@app.route('/')
def hello_world():
    return "hello world!"

@app.route('/test_param')
def test_param():
    name = request.args.get('name')
    response = make_response()
    if name == 'testing':
        response.data = "Enpoint test passed with passed parameter"
        response.status_code = 200
    else:
        response.data = "FAILURE"
        response.status_code = 404
        
    return response
    # return ["Test successful", 404]

@app.route('/authenticate')
def authenticate_user():
    user_id = request.args.get('userId')
    password = (collection.find_one({"email": user_id}))["password"]
    return jsonify({'password': password})



if __name__ == "__main__":
    app.run(debug=True, port=3000)
    
    # test_connection()
    # authenticate_user()
