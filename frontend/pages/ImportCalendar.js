import React from "react";
import {FileUpload} from "../components";
import CssBaseline from "@mui/material/CssBaseline";
import {Text} from "react-native";
import icsToJson from "ics-to-json";
import {Loading, PreferencesPage} from "./index";
import moment from "moment";

const ImportCalendar = ({ }) => {
    const [ courses, setCourses ] = React.useState([]);
    const [ confirm, setConfirm ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);

    const onUpload = async (file) => {
        const icsData = await file.text()
        const data = icsToJson(icsData)
        data.map((event) => {
            delete event?.description;
            delete event?.location;
        })
        console.log(data);
        setCourses(data);
        setConfirm(true);
        parseDates(data);
    };

    const parseDates = (data) => {
        data.map((event) => {
            event.startDate = moment(event.startDate).unix();
            event.endDate = moment(event.endDate).unix();
        })
    }

    //remove items with same summary
    const removeDuplicates = (data) => {
        return data
            .map(e => e.summary)
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => data[e]).map(e => data[e]);
    }

    return (
        <div>
            <CssBaseline />
            {loading ? <Loading /> : <div>
                {!confirm ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: 50
                        }}>
                            <CssBaseline />
                            <Text style={{fontSize: 36, fontWeight: 600, marginBottom: 60}}>What classes are you taking?</Text>
                            <FileUpload onUpload={onUpload} />
                            <Text style={{fontSize: 20, textAlign: 'center', marginTop: 40}}>We currently only support <Text style={{color: '#537A5A'}}>.ics</Text> files. Please navigate to your<br />school’s self-serve time table page to download it.</Text>
                        </div>) : (
                        <PreferencesPage courses={removeDuplicates(courses)} onBack={() => setConfirm(false)} onConfirm={() => {setLoading(true)}} />)
                }
                </div>
            }
        </div>
    );
}

export default ImportCalendar;