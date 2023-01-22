from pymongo import MongoClient
from flask import Flask, jsonify, request, make_response
import json
from bson import json_util

app = Flask(__name__)

client = MongoClient("mongodb+srv://admin:notadmin@banban.dqizue2.mongodb.net/?retryWrites=true&w=majority")
user_db = client["users"]
user_collection = user_db["users"]
scheduling_collection = user_db["schedules"]
user_scheduling_collection = user_db["user_schedules"]

@app.route('/')
def hello_world():
    return "Welcome to Scheduling API!"

@app.route('/get_courses')
def get_courses():
    print("get_courses got called!")
    courses = list(scheduling_collection.find())
    courses = courses[0]['courses']
    
    response = json.dumps(courses, default=json_util.default)

    return response

@app.route('/get_course')
def get_course():
    course_name = request.args.get('course')
    print(f"get course with param {course_name} was called")

    courses = list(scheduling_collection.find())
    courses = courses[0]['courses']

    response = make_response()
    course_exists = False

    for course in courses:
        print(course['name'])
        if (course_name == course['name']):
            response.data = json.dumps(course, default=json_util.default)
            response.status_code = 200
            course_exists = True

    if not course_exists:
        response.data = f"Cannot find any courses called {course_name} in our database"
        response.status_code = 404
            
    return response

@app.route('/schedule', methods=['POST'])
def schedule():
    json_data = request.get_json()
    print(f"json_data recieved: {json_data}")

    user_scheduling_collection.insert_one(json_data)

    return "yooo"

    # return jsonify(json_data)
    # if len(request.form) > 0:
    #     print(request.form)
    # else:
    #     print("request.form is empty!")

    # json_data = request.form
    # print(f"json_data: {jsonify(json_data)}")
    # for data in json_data:
    #     print(data)

    # response = make_response(jsonify(json_data))
    # response.status_code = 200
    # return response

@app.route('/get_schedule')
def get_schedule():
    courses = list(user_scheduling_collection.find())
    courses = courses[0]['user']

    print(f"user schedule is : {courses}")

    response = json.dumps(courses, default=json_util.default)
    return response


if __name__ == "__main__":
    app.run(debug=True, port=5000)