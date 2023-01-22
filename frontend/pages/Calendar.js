import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, toast } from '@mobiscroll/react';
import React, {useEffect, useState} from 'react';
import {styled} from "@mui/material";
import CurrentTask from "../components/CurrentTask";
import CssBaseline from "@mui/material/CssBaseline";
import {Text} from "react-native";
import Button from "@mui/material/Button";

const Container = styled('div')({
    height: '100%',
    minWidth: '90vw',
    borderRadius: 12,
    overflow: 'hidden',
});

const Top = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

const Calendar = () => {
    const [myEvents, setEvents] = React.useState([]);
    const [time, setTime] = useState(new Date());

    React.useEffect(() => {
        getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);

    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title
        });
    }, []);

    const view = React.useMemo(() => {
        return {
            schedule: { type: 'week' }
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getWelcomeMessage = (name) => {
        const hour = time.getHours();
        if (hour < 12 && hour > 4) {
            return `Good morning, ${name}! It's currently ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.`;
        } else if (hour < 18 && hour > 12) {
            return `Good afternoon, ${name}! It's currently ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.`;
        } else {
            return `Good evening, ${name}! It's currently ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.`;
        }
    }

    return (
        <div style={{gap: 32, display: 'flex', flexDirection: 'column'}}>
            <CssBaseline />
            <Top>
                <Text style={{fontWeight: 700, fontSize: 36, color: '#FFEDDF'}}>{getWelcomeMessage()}</Text>
                <Button variant={'contained'} color="secondary" >Log Out</Button>
            </Top>
            <Container style={{maxHeight: '80vh'}}>
                <Eventcalendar
                    theme="material"
                    themeVariant="light"
                    clickToCreate={true}
                    dragToCreate={true}
                    dragToMove={true}
                    dragToResize={true}
                    eventDelete={true}
                    data={myEvents}
                    view={view}
                    onEventClick={onEventClick}
                />
            </Container>
        </div>
    );
}

export default Calendar