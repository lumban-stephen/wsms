import { Paper, Container } from '@mui/material';
import React from 'react';

const AnnounceBox: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '80px',
          marginTop: '20px', // Adjust this value to add the desired space
        }}
      >
        <h1 style={{ textAlign: 'center', margin: 0, padding: 0 }}>Dept Announcement Page</h1>
        {/* Add your login page content here */}
      </Paper>
      
    </Container>
  );
};

export default AnnounceBox;
