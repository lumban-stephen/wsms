import { Paper, Typography } from '@mui/material';
import React from 'react';

interface AnnounceBoxProps {
    title: string;
    message: string;
}

const AnnounceBox: React.FC<AnnounceBoxProps> = ({ title, message }) => {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column', // Adjust to column layout to display title and body vertically
                alignItems: 'center', // Center content horizontally
                justifyContent: 'center',
                minHeight: '200px',
                marginTop: '20px', // Adjust this value to add the desired space
                padding: '20px', // Add padding for spacing
            }}
        >
            <Typography variant="h4">{title}</Typography>
            <Typography>{message}</Typography>
        </Paper>
    );
};

export default AnnounceBox;
