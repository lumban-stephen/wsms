import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DeptCard from '../../components/dept-card';
import RequestCard from '../../components/req-card';

const AdminDept: React.FC = () => {
  const departments = [
    'Department Name 1',
    'Department Name 2',
    'Department Name 3',
    'Department Name 4',
    'Department Name 5',
    'Department Name 6',
    'Department Name 7',
    'Department Name 8',
  ];

  const requests = [
    {
      date: 'Feb 12, 2024',
      department: 'College of Computer Studies',
      requestType: 'Hardware',
      quantity: 5,
      status: 'Pending',
    },
    {
      date: 'Feb 12, 2024',
      department: 'School of Transportation Office',
      requestType: 'Equipment',
      quantity: 2,
      status: 'Approved',
    },
    {
      date: 'Feb 12, 2024',
      department: 'School of Transportation Office',
      requestType: 'Software',
      quantity: 1,
      status: 'Pending for Approval',
    },
    {
      date: 'Feb 22, 2024',
      department: 'Center for Student Transportation',
      requestType: 'Equipment',
      quantity: 3,
      status: 'Waiting for Approval',
    },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: '60%', backgroundColor: '#f0f0f0', p: 3 }}>
        <Grid container spacing={2}>
          {departments.map((dept, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              {/* <DeptCard imageUrl="" departmentName={dept} /> */}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ width: '40%', backgroundColor: '#e0e0e0', p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Department Requests
        </Typography>
        <Box sx={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}>
          {requests.map((request, index) => (
            <RequestCard
              key={index}
              date={request.date}
              department={request.department}
              requestType={request.requestType}
              quantity={request.quantity}
              status={request.status}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDept;