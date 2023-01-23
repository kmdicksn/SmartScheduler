from ortools.linear_solver import pywraplp
from ortools.init import pywrapinit
from datetime import datetime, timedelta

days = 7
hours = 5

# Define problem data in terms of days and hours
courses = [    
    # {   
    #     "name": "course 1",
    #     "assignments": [ 
    #         { "name": "assignment 1", "dueDate": "2022-01-24", "duration": 2 } 
    #     ],
    #     "priority": 1
    # },
    {
        "name": "course 2",
        "assignments": [
            { "name": "assignment 3", "dueDate": "2023-01-24", "duration": 1}
            # { "name": "assignment 4", "dueDate": "2023-01-25", "duration": 2 },
        ],
        "priority": 1
    }
]

# Create model object
model = pywraplp.Solver("AssignmentScheduling", pywraplp.Solver.CBC_MIXED_INTEGER_PROGRAMMING)

# Create variables
x = [[[[model.IntVar(0, 1, "x[{},{},{},{}]".format(i, j, k, l)) for l in range(hours)] for k in range(days)] for j in range(len(courses[i]['assignments']))] for i in range(len(courses))]

# The objective is to minimize the value of priority * daysToDue so that the ones with the highest priority and closest due time get scheduled first
print(f"len of courses : {len(courses)}, assignments: {len(courses[0]['assignments'])}")
objective = model.Objective()
for i in range(len(courses)):
    for j in range(len(courses[i]['assignments'])):
        dueDate = datetime.strptime(courses[i]['assignments'][j]['dueDate'], '%Y-%m-%d')
        daysToDue = (dueDate - datetime.now()).days
        priority = courses[i]['priority']
        temp_var = model.NumVar(0, model.infinity(), "temp_%d_%d" % (i, j))
        for k in range(days):
            for l in range(hours):
                temp_var_k_l = (l * 0.015) * (k * 0.3) * (priority) * (daysToDue)
                temp_var += temp_var_k_l
                print(temp_var_k_l)
                #objective.SetCoefficient(temp_var_k_l,1)
        print(temp_var)        
        #objective.SetCoefficient(temp_var, 1)

objective.SetMinimization()




# # making sure that the total scheduled hours per day is less than 24 hours
# for k in range(days):
#     for l in range(hours):
#         hourConstraint = model.Constraint(0, 24)
#         for i in range(len(courses)):
#             for j in range(len(courses[i]['assignments'])):
#                 hourConstraint.SetCoefficient(x[i][j][k][l], courses[i]['assignments'][j]['duration'])

# # making sure that the assignments are scheduled once
# for i in range(len(courses)):
#     for j in range(len(courses[i]['assignments'])):
#         assignment_constraint = model.Constraint(0, 1)
#         for k in range(days):
#             for l in range(hours):
#                 assignment_constraint.SetCoefficient(x[i][j][k][l], 1)

# # # making sure that the assignments are all scheduled according to their duration
# for i in range(len(courses)):
#     for j in range(len(courses[i]['assignments'])):
#         assignment_duration_constraint = model.Constraint(courses[i]['assignments'][j]['duration'], courses[i]['assignments'][j]['duration'])
#         for k in range(days):
#             for l in range(hours):
#                 assignment_duration_constraint.SetCoefficient(x[i][j][k][l], 1)

# # # Making sure that two assignments are not scheduled at the same day and hour
# for k in range(days):
#     for l in range(hours):
#         hour_constraint = model.Constraint(0, 1)
#         for i in range(len(courses)):
#             for j in range(len(courses[i]['assignments'])):
#                 hour_constraint.SetCoefficient(x[i][j][k][l], 1)

# Solve the problem
print(f"data before solving: {x}")
result_status = model.Solve()
print(f"data after  solving: {x}")
# Create calendar
calendar = [[[] for _ in range(hours)] for _ in range(days)]
for k in range(days):
    for l in range(hours):
        for i in range(len(courses)):
            for j in range(len(courses[i]['assignments'])):
                if x[i][j][k][l].solution_value() == 1:
                    calendar[k][l].append({
                        'name': courses[i]['assignments'][j]['name'],
                        'duration': courses[i]['assignments'][j]['duration'],
                        'course': courses[i]['name']
                    })

print(calendar)