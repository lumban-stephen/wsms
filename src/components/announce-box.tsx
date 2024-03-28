import { Paper } from '@mui/material';
import React, { ReactNode } from 'react';

interface AnnounceBoxProps {
    children: ReactNode; // Define children prop as ReactNode type
}

const AnnounceBox: React.FC<AnnounceBoxProps> = ({ children }) => {
    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '800px',
                marginTop: '20px', // Adjust this value to add the desired space
            }}
        >
            {children}
        </Paper>
    );
};

export default AnnounceBox;
