import { Paper, Container } from '@mui/material';
import React from 'react';
import AnnounceBox from '../../components/announce-box';
import DeptAnnounceBoxInput from '../../components/announcebox-input';

const DeptAnnounce: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <DeptAnnounceBoxInput></DeptAnnounceBoxInput>
      <AnnounceBox>
        <p>Announcement Sample Here</p>
      </AnnounceBox>
    </Container>
  );
};

export default DeptAnnounce;
