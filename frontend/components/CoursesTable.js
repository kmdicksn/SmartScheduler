import {styled} from "@mui/material";
import { PriorityDropdown } from "./index";

const CoursesTable = ({ courses }) => {
    const TableContainer = styled('div')(({ theme }) => ({
        backgroundColor: '#FFFAF5',
        borderRadius: 8,
        width: '100%',
        border: '1px solid black',
        overflow: 'auto',
    }));

    const TableRow = styled('tr')(({ theme }) => ({
        height: '48px',
        border: '1px solid black',
        '&:nth-of-type(odd)': {
            backgroundColor: '#FFEDDF'
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#FFFAF5',
        }
    }));

    const TableData = styled('td')(({ theme }) => ({
        minHeight: 48,
        textAlign: 'center',
        borderRight: '1px solid black',
    }));

    const emptyRows = 6 - Math.min(6, courses?.length);

    //get the weekday of the unix timestamp
    function getWeekday(unix_timestamp) {
        const date = new Date(unix_timestamp * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    function formatClasses(classes) {
        // Create an empty object to store the grouped classes
        const groupedClasses = {};

        // Iterate through each class in the input array
        classes.forEach(cls => {
            // Get the summary of the current class
            const summary = cls.summary;

            // If the summary doesn't exist in the groupedClasses object, create an empty array for it
            if (!groupedClasses[summary]) {
                groupedClasses[summary] = [];
            }

            // Push the current class object into the array for its summary
            groupedClasses[summary].push(cls);
        });

        // Iterate through the summary keys
        for (let summary in groupedClasses) {
            let start = '';
            let end = '';
            groupedClasses[summary].forEach(cls => {
                //parse the start and end time
                const startTime = new Date(cls.startDate * 1000);
                const endTime = new Date(cls.endDate * 1000);
                const day = startTime.toString().substring(0,3);
                const startH = startTime.toString().substring(16,18);
                const startM = startTime.toString().substring(19,21);
                const endH = endTime.toString().substring(16,18);
                const endM = endTime.toString().substring(19,21);
                //format the time
                start += day + " " + startH + ":" + startM + ", ";
                end += day + " " + endH + ":" + endM + ", ";
            });
            groupedClasses[summary] = start.slice(0, -2) + " - " + end.slice(0,-2);
        }

        // Return the groupedClasses object
        return groupedClasses;
    }

    const renderEmptyRows = () => {
        let rows = [];
        for (let i = 0; i < emptyRows; i++) {
            rows.push(
                <TableRow>
                    <TableData></TableData>
                    <TableData style={{border: 'none'}}></TableData>
                </TableRow>
            )
        }
        return rows;
    }

    return (
        <TableContainer>
            <table style={{
                width: '100%',
            }} className="courses-table" cellSpacing="0">
                <thead style={{
                    fontWeight: 600,
                }}>
                    <TableRow style={{
                        backgroundColor: '#FFFAF5'
                    }}>
                        <TableData style={{border: 'none'}}>Courses</TableData>
                    </TableRow>
                </thead>
                <tbody>
                    {courses?.map((course, index) => (
                        <TableRow key={index}>
                            <TableData style={{border: 'none'}}>{course.summary}</TableData>
                        </TableRow>
                    ))}
                    {renderEmptyRows()}
                </tbody>
            </table>
        </TableContainer>
    )
}

export default CoursesTable;