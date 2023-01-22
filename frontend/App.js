import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Login, PreferencesPage, ImportCalendar} from "./pages";

const theme = createTheme({
    palette: {
        primary: {
          main: '#537A5A'
        },
        typography: {
            fontFamily: [
                'Rubik'
            ]
        }
    }
});

export default function App() {
  return (
  <ThemeProvider theme={theme}>
    <View style={styles.container}>
        <div style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 50,
            boxShadow: "0px 11px 10px -1px black"
        }}>
          <PreferencesPage/>
        </div>
    </View>
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
