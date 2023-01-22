
function createScheduleMain(legacyCourses) {
    // let assignment= [];
    // for (let i = 0; i < legacyCourses.length; i++) {
    //     assignment.push(legacyCourses[i].assignments)
    // }
    let assignments = [].concat(...legacyCourses.map(course => course.assignments));

    let userCourses = [
        {summary: 'CPSC 310 202', startDate: 1673388000, endDate: 1673393400},
        {summary: 'CPSC 310 202', startDate: 1673560800, endDate: 1673566200}
    ];

    console.log("Legacy Courses: ", legacyCourses)
    console.log("Assignment: ", assignments)
    let schedule = createSchedule(userCourses, assignments, new Date())
    console.log(schedule)
}

createScheduleMain(
    [
        {
            "name": "CPSC310",
            "assignments":
            [
                {
                    "name": "Assignment 1",
                    "due_date": "2023-01-25",
                    "duration": "5"
                }
                // {
                //     "name": "Assignment 2",
                //     "due_date": "Feb 16",
                //     "duration": "7"
                // },
                // {
                //     "name": "Assignment 3",
                //     "due_date": "Mar 01",
                //     "duration": "12"
                // },
                // {
                //     "name": "Assignment 4",
                //     "due_date": "Apr 7",
                //     "duration": "18"
                // }
            ]
        }
    ]
)






function createSchedule(courses, assignments, currentDate) {
    // Initialize an empty schedule
    let schedule = [];

    // Sort the assignments by due date, with the closest due date first
    assignments.sort((a, b) => a.dueDate - b.dueDate);
    console.log("Here is the sorted array: ", assignments)

    // Iterate through the assignments
    for (let i = 0; i < assignments.length; i++) {
        let assignment = assignments[i];
        // CHANGE
        //let course = courses.find(c => c.id === assignment.courseId);

        // Get the start date for the assignment, which is 2 weeks before the due date
        console.log(assignment.due_date);
        let currentDueDate = assignment.due_date;
        let dueDate = new Date(assignment.due_date);
        let startDate = new Date(dueDate.getTime() - (14 * 86400000));
        
        // Check if the current date is later than the start date
        if (currentDate > startDate) {
            startDate = currentDate;
        }

        // Initialize the end date as the due date
        let endDate = new Date(assignment.due_date);

        // Find a time slot in the schedule that does not conflict with the course or other assignments
        while (true) {
            // CHANGE THIE COURSE TO COURSES
            let timeSlot = findAvailableTimeSlot(schedule, startDate, endDate, courses);
            if (timeSlot) {
                // Add the assignment to the schedule at the found time slot
                let endTime = new Date(timeSlot.startTime)
                endTime.setHours(endTime.getHours() + 5)
                schedule.push({
                    assignmentId: assignment.name,
                    startTime: timeSlot.startTime,
                    endTime: new Date(endTime) 
                });
                break;
            } else {
                // If no time slot is found, move the start date to the next day
                startDate.setDate(startDate.getDate() + 1);
                console.log("ERROR: WE CANNOT SCHEDULE THIS....")
                console.log(schedule)
                break;
            }
        }
    }
    return schedule;
}

function findAvailableTimeSlot(schedule, startDate, endDate, courses) {
    // Initialize the current date as the start date
    let currentDate = startDate;

    // Initialize the current time as the start of the day
    let currentTime = new Date(currentDate);
    currentTime.setHours(0, 0, 0, 0);

    // Iterate through the schedule to find an available time slot
    while (currentDate <= endDate) {
        let available = true;

        // Check if the current time slot conflicts with a course or other assignment
        for (let i = 0; i < schedule.length; i++) {
            let scheduledEvent = schedule[i];
            if (scheduledEvent.startTime <= currentTime && currentTime < scheduledEvent.endTime) {
                available = false;
                break;
            }
        }

        // Check if the current time slot conflicts with the course schedule
        // CHANGE THIS PART
        for (let i = 0; i < courses.length; i++) {  
            if (courses[i].startTime <= currentTime && currentTime < courses[i].endTime) {
                available = false;
                break;
            }
        }

        // If the time slot is available, return it
        if (available) {
            return { startTime: currentTime};
        }

        // Move to the next time slot
        currentTime.setTime(currentTime.getTime() + 30 * 60 * 1000); // 30 minutes

    // If the end of the day is reached, move to the next day
    if (currentTime.getHours() === 23 && currentTime.getMinutes() === 59) {
        currentTime.setDate(currentTime.getDate() + 1);
        currentTime.setHours(0, 0, 0, 0);
        currentDate = new Date(currentTime);
    }
}

// If no available time slot is found, return null
return null;
}