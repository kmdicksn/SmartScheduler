import Box from '@mui/material/Box';

export default function Container(props) {
    return (
        <Box
            component="main"
            style={{
                minWidth: '40vw',
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: "#FFFFFF",
                alignSelf: 'center',
            }}
        >
            {props.children}
        </Box>
    );
}