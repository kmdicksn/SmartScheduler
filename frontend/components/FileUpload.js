import React, {useCallback} from 'react';
import {styled} from "@mui/material";
import {Text} from "react-native";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import PriorityLabels from "./PriorityLabels";
import {useDropzone} from "react-dropzone";

const BorderBox = styled('div')(({theme}) => ({
    minWidth: '40vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    border: `3px solid ${theme.palette.primary.main}`,
    borderStyle: 'dashed',
    padding: 42,
    borderRadius: 8,
    transition: 'all 0.1s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(217,217,217,0.28)',
    }
}));

const UploadIcon = () => {
    return (
        <svg width="93" height="86" viewBox="0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.1187 73.0104C19.2458 73.0104 17.599 72.3535 16.1781 71.0396C14.7573 69.7257 14.0469 68.2028 14.0469 66.4708V53.5708H21.1187V66.4708H71.8812V53.5708H78.9531V66.4708C78.9531 68.2028 78.2427 69.7257 76.8219 71.0396C75.401 72.3535 73.7542 73.0104 71.8812 73.0104H21.1187ZM43.0125 58.2291V25.2625L31 36.3708L25.9625 31.7125L46.5969 12.6312L67.2313 31.7125L62.0969 36.3708L50.0844 25.2625V58.2291H43.0125Z" fill="#537A5A"/>
        </svg>
    )
}

const FileUpload = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, [])
    const {getRootProps} = useDropzone({onDrop})

    return (
        <BorderBox {...getRootProps()}>
            <UploadIcon />
            <Text style={{fontSize: 24}}>Drag and drop your course schedule here</Text>
            <Text style={{fontSize: 20}}>or</Text>
            <Button variant="contained" color="primary" style={{minWidth: 200}}>Browse Files</Button>
        </BorderBox>
    );
}

export default FileUpload;