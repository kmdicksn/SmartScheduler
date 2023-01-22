import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Login, PreferencesPage, ImportCalendar, Loading, Calendar} from "./pages";
import Button from "@mui/material/Button";

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
  return (
  <ThemeProvider theme={theme}>
    <View style={styles.container}>
            <div style={{
                backgroundColor: "white",
                borderRadius: 12,
                overflow: "hidden",
            }}>
                <ImportCalendar />
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
