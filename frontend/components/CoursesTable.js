import {styled} from "@mui/material";
import { PriorityDropdown } from "./index";

const CoursesTable = ({ courses = [{ name: "test", schedule: "test", priority: "high" },{ name: "test", schedule: "test", priority: "medium" }] }) => {
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
    console.log(emptyRows);

    const renderEmptyRows = () => {
        let rows = [];
        for (let i = 0; i < emptyRows; i++) {
            rows.push(
                <TableRow>
                    <TableData></TableData>
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
                        <TableData width={'25%'}>Course</TableData>
                        <TableData width={'45%'}>Schedule</TableData>
                        <TableData style={{border: 'none'}}>Priority</TableData>
                    </TableRow>
                </thead>
                <tbody>
                    {courses?.map((course, index) => (
                        <TableRow key={index}>
                            <TableData>{course.name}</TableData>
                            <TableData>{course.schedule}</TableData>
                            <TableData style={{border: 'none'}}>
                                <PriorityDropdown priority={course.priority} />
                            </TableData>
                        </TableRow>
                    ))}
                    {renderEmptyRows()}
                </tbody>
            </table>
        </TableContainer>
    )
}

export default CoursesTable;