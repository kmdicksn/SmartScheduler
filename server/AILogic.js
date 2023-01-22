// Import the necessary modules
const ortools = require('@google/ortools');
const moment = require('moment');

const days = 7;
const hours = 24;

// Define problem data in terms of days and hours
const courses = [    {        name: "course 1",        assignments: [            { name: "assignment 1", dueDate: "2022-01-15", duration: 2 },            { name: "assignment 2", dueDate: "2022-01-20", duration: 3 },        ],
        priority: 1
    },
    {
        name: "course 2",
        assignments: [
            { name: "assignment 3", dueDate: "2022-01-22", duration: 4 },
            { name: "assignment 4", dueDate: "2022-01-25", duration: 2 },
        ],
        priority: 2
    }
];

// Create model object
const model = new ortools.linear_solver.pywraplp.Solver(
    "AssignmentScheduling",
    ortools.Solver.CBC_MIXED_INTEGER_PROGRAMMING
);

// Create variables
const x = new Array(courses.length);
for (let i = 0; i < courses.length; i++) {
    x[i] = new Array(courses[i].assignments.length);
    for (let j = 0; j < courses[i].assignments.length; j++) {
        x[i][j] = new Array(days);
        for (let k = 0; k < days; k++) {
            x[i][j][k] = new Array(hours);
            for (let l = 0; l < hours; l++) {
                x[i][j][k][l] = model.MakeIntVar(0, 1, `x[${i},${j},${k},${l}]`);
            }
        }
    }
}

// The objective is to minimize the value of priority * daysToDue so that the ones with the highest priority and closest due time get scheduled first
let objective = model.Objective();
for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < courses[i].assignments.length; j++) {
        for (let k = 0; k < days; k++) {
            for (let l = 0; l < hours; l++) {
                let dueDate = moment(courses[i].assignments[j].dueDate);
                let daysToDue = dueDate.diff(moment(), 'days');
                let priority = courses[i].priority;
                objective.SetCoefficient(x[i][j][k][l], priority * daysToDue);
            }
        }
    }
}
objective.SetMinimization();

// making sure that the total scheduled hours per day is less than 24 hours
for (let k = 0; k < days; k++) {
    for (let l = 0; l < hours; l++) {
        let hourConstraint = model.AddConstraint(0, 24);
        for (let i = 0; i < courses.length; i++) {
            for (let j = 0; j < courses[i].assignments.length; j++) {
                hourConstraint.SetCoefficient(x[i][j][k][l], courses[i].assignments[j].duration);
            }
        }
    }
}

// making sure that the assignment is scheduled once
for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < courses[i].assignments.length; j++) {
        let assignmentConstraint = model.AddConstraint(1, 1);
        for (let k = 0; k < days; k++) {
            for (let l = 0; l < hours; l++) {
                assignmentConstraint.SetCoefficient(x[i][j][k][l], 1);
            }
        }
    }
}

// making sure that the assignments are all scheduled according to their duration
for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < courses[i].assignments.length; j++) {
        let assignmentDurationConstraint = model.AddConstraint(courses[i].assignments[j].duration, courses[i].assignments[j].duration);
        for (let k = 0; k < days; k++) {
            for (let l = 0; l < hours; l++) {
                assignmentDurationConstraint.SetCoefficient(x[i][j][k][l], 1);
            }
        }
    }
}

// Making sure that two assignments are not scheduled at the same day and hour
for (let k = 0; k < days; k++) {
    for (let l = 0; l < hours; l++) {
        let hourConstraint = model.AddConstraint(0, 1);
        for (let i = 0; i < courses.length; i++) {
            for (let j = 0; j < courses[i].assignments.length; j++) {
                hourConstraint.SetCoefficient(x[i][j][k][l], 1);
            }
        }
    }
}



// Solve the problem
let resultStatus = model.Solve();

// Create calendar
const calendar = new Array(days);
for (let k = 0; k < days; k++) {
    calendar[k] = new Array(hours);
    for (let l = 0; l < hours; l++) {
        calendar[k][l] = [];
        for (let i = 0; i < courses.length; i++) {
            for (let j = 0; j < courses[i].assignments.length; j++) {
                if (x[i][j][k][l].solution_value() == 1) {
                    calendar[k][l].push({
                        name: courses[i].assignments[j].name,
                        duration: courses[i].assignments[j].duration,
                        course: courses[i].name
                    });
                }
            }
        }
    }
}
console.log(calendar);

       
