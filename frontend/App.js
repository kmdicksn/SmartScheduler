import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Login, PreferencesPage, ImportCalendar, Loading, Calendar} from "./pages";
import Button from "@mui/material/Button";
import httpClient from "./httpClient";
import {useEffect, useState} from "react";

const theme = createTheme({
    palette: {
        primary: {
          main: '#537A5A'
        },
        secondary: {
          main: '#AFE0CE'
        },
        typography: {
            fontFamily: [
                'Rubik'
            ]
        }
    }
});

export default function App() {
    const [schedule, setSchedule] = useState([]);

    // useEffect(() => {
    //     const getSchedule = async () => {
    //         try {
    //             const resp = await httpClient.get("127.0.0.1:5000/get_schedule");
    //             setSchedule(resp.data);
    //         } catch(e) {
    //             console.log("Failed to get schedule.");
    //         }
    //     }
    //      setSchedule();
    // }, []);

  return (
  <ThemeProvider theme={theme}>
      {schedule.length > 0 ? <Calendar schedule={schedule} /> :
          <View style={styles.container}>
              <div style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  overflow: "hidden",
              }}>
                  <ImportCalendar setSchedule={setSchedule} />
          </div>
      </View>}
  </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#537A5A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
});
