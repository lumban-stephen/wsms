import { Paper, Container } from '@mui/material';
import React from 'react';
import AnnounceBox from '../../components/announce-box';

const DeptAnnounce: React.FC = () => {
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
      <AnnounceBox>
        <p>Announcement Sample Here</p>
      </AnnounceBox>
    </Container>
  );
};

export default DeptAnnounce;
