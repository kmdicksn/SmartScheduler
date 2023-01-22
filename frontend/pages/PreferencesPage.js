import CssBaseline from "@mui/material/CssBaseline";
import {Text} from "react-native";
import React from "react";
import CoursesTable from "../components/CoursesTable";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";

const Toolbar = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: 40,
}));

const PreferencesPage = ({ courses, onConfirm, onBack }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minWidth: '40vw',
            margin: 50
        }}>
            <CssBaseline />
            <Text style={{fontSize: 36, fontWeight: 700, marginBottom: 60}}>Just to double check, does<br/>everything look good?</Text>
            <CoursesTable courses={courses}/>
            <Toolbar>
                <Button variant='outlined' style={{width: '10vw', textTransform: 'none'}} onClick={onBack}>Go Back</Button>
                <Button variant="contained" style={{backgroundColor: '#537A5A', color: 'white', width: '15vw', textTransform: 'none'}} onClick={onConfirm}>Looks Good!</Button>
            </Toolbar>
        </div>
    )
}

export default PreferencesPage;