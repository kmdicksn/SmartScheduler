import {FileUpload} from "../components";
import PriorityLabels from "../components/PriorityLabels";
import CssBaseline from "@mui/material/CssBaseline";
import {Text} from "react-native";
import React from "react";

export default function ImportCalendar() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <CssBaseline />
            <Text style={{fontSize: 36, fontWeight: 600, marginBottom: 60}}>What classes are you taking?</Text>
                <FileUpload/>
            <Text style={{fontSize: 20, textAlign: 'center', marginTop: 40}}>We currently only support <Text style={{color: '#537A5A'}}>.ics</Text> files. Please navigate to your<br />school’s self-serve time table page to download it.</Text>
        </div>
    )
}