import {Text} from "react-native";
import {CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                margin: 50
            }}
        >
            <Text style={{fontSize: 36, fontWeight: 600, marginBottom: 50}}>
                All set! Give us one second<br />to get everything ready.
            </Text>
            <CircularProgress size="5rem" />
        </div>
    )
}

export default Loading