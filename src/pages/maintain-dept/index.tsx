import React from 'react';
import { Grid, Box } from '@mui/material';
import DeptCard from '../../components/dept-card';
import DeptReqCard from '../../components/deptreq-card';

const DeptDashboard = () => {
  // Sample data for department cards and request cards
  const deptCards = [
    { imageUrl: 'dept1.jpg', departmentName: 'Department 1' },
    { imageUrl: 'dept2.jpg', departmentName: 'Department 2' },
    // Add more department card data
  ];

  const reqCards = [
    {
      collegeName: 'College of Computer Studies',
      requestType: 'Replacement',
      quantity: 2,
      status: 'Waiting for Approval',
    },
    {
      collegeName: 'Merton Transportation Office',
      requestType: 'Replacement',
      quantity: 5,
      status: 'Approved',
    },
    // Add more request card data
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
        >
          {deptCards.map((card, index) => (
            <Box key={index} m={1}>
              <DeptCard imageUrl={card.imageUrl} departmentName={card.departmentName} />
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" flexDirection="column">
          {reqCards.map((card, index) => (
            <Box key={index} mb={2}>
              <DeptReqCard
                collegeName={card.collegeName}
                requestType={card.requestType}
                quantity={card.quantity}
                status={card.status}
              />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DeptDashboard;