import {styled} from "@mui/material";
import {useEffect, useState} from "react";
import {Text} from "react-native";

const Wrapper = styled("div")(({ theme }) => ({
    backgroundColor: '#C5D86D',
    borderRadius: '12px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
}));

const ProgressBar = styled("div")(({ theme }) => ({
    height: 10,
    width: "100%",
    backgroundColor: theme.palette.grey[300],
    borderRadius: 5,
    overflow: "hidden",
}));

const Progress = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "inherit",
    transition: "width 0.5s ease-in-out",
}));

const timeProgress = (startTime, endTime) => {
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const total = end - start;
    const progress = now - start;
    return progress / total;
};

const CurrentTask = ({ title, startTime, endTime }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(timeProgress(startTime, endTime));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Wrapper>
            <Text style={{fontWeight: 700, fontSize: 36}}>{title}</Text>
            <Text style={{marginTop: '20px', marginBottom: '8px'}}>{startTime} - {endTime}</Text>
            <ProgressBar>
                <Progress style={{ width: `${progress}%` }} />
            </ProgressBar>
        </Wrapper>
    )
}

export default CurrentTask