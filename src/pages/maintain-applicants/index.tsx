import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';
import NavBar from '../../components/navbar';
import React, { useState } from 'react';
import ApplicantList from '../../components/applicant-list';

// ... other imports and component definitions ...

const MaintainApplicants: React.FC = () => {
  // ... other component state and functions ...

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      {/* Content Per Tab */}
      <Box style={{ backgroundColor: 'white', height: '87vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', minHeight: '73vh' }}>
          {/* Active Tab Content */}
          {(
            <>
              {/* Applicant List Component */}
              <ApplicantList applicants={applicants} handleViewApplicant={handleViewApplicant} />
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MaintainApplicants;
