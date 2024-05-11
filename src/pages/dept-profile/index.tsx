import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DeptDetails from '../../components/dept-details';
import WsCard from '../../components/ws-card';

const DeptProfile = () => {
  // Sample data for department details and working scholar cards
  const deptDetails = {
    name: 'College of Computer Studies',
    description: 'This is the description of the College of Computer Studies.',
    contactDetails: '123 Main Street, City, Country',
    email: 'college@example.com',
    requestHistory: [
      { requestType: 'Request Type 1', date: 'June 10, 2022' },
      { requestType: 'Request Type 2', date: 'June 15, 2022' },
      // Add more request history data
    ],
  };

  const wsCards = [
    { imageUrl: 'scholar1.jpg', name: 'Working Scholar 1', role: 'Web Developer' },
    { imageUrl: 'scholar2.jpg', name: 'Working Scholar 2', role: 'UI Designer' },
    // Add more working scholar card data
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
      <DeptDetails
        departmentName={deptDetails.name}
        contactDetails={deptDetails.contactDetails}
        email={deptDetails.email}
        requestHistory={deptDetails.requestHistory}
        />;
      </Grid>
      <Grid item xs={12} md={9}>
        <Box>
          <Typography variant="h4" mb={2}>
            {deptDetails.name}
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="center"
          >
            {wsCards.map((card, index) => (
              <Box key={index} m={1}>
                <WsCard
                imageUrl={card.imageUrl}
                name={card.name}
                department={card.role} // Assuming `role` is the same as `department`
                />;
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DeptProfile;