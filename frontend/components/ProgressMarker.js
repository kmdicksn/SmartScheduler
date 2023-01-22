import {styled} from "@mui/material";

const ProgressMarker = ({ progress }) => {
    const ProgressBall = styled('div')(({ theme, selected }) => ({
        backgroundColor: selected ? '#AFE0CE' : '#C5D86D',
        borderRadius: '50%',
        width: 80,
        height: 80
    }));

    const ProgressLine = styled('div')(({ theme, selected }) => ({
        backgroundColor: selected ? '#AFE0CE' : '#C5D86D',
        width: 110,
        height: 6
    }));

    return (
        <div className="progress-marker">
            <ProgressBall selected={progress >= 1} />
            <ProgressLine selected={progress >= 2} />
            <ProgressLine selected={progress >= 2} />
            <ProgressLine selected={progress >= 3} />
            <ProgressBall selected={progress >= 3} />
            <ProgressLine selected={progress >= 4} />
            <ProgressLine selected={progress >= 4} />
        </div>
    )
}