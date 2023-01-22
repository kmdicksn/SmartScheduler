import {styled} from "@mui/material";

const PriorityLabels = ({ priority }) => {
    const ColorMap = {
        'low': '#9CDEB7',
        'medium': '#FBDAA8',
        'high': '#F9A8A8',
    }

    const PriorityLabel = styled('div')(({ theme }) => ({
        backgroundColor: ColorMap[priority],
        borderRadius: 8,
        width: 135,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    }));

    return (
        <PriorityLabel className="priority-label">
            {priority[0].toUpperCase() + priority.slice(1)}
        </PriorityLabel>
    )
}

export default PriorityLabels;