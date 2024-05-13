import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const AdminDashboard = () => {
  const [data, setData] = useState({
    workingScholarsInService: 0,
    waitingForAssignment: 0,
    latestAnnouncement: '',
    pendingApplicants: 0,
    totalPending: 0,
    pendingDeptRequest: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        if (response.ok) {
          const dashboardData = await response.json();
          setData(dashboardData);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Working Scholars in service */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Working Scholars in service
              </Typography>
              <Typography variant="h3" component="div">
                {data.workingScholarsInService}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Waiting for assignment */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Waiting for assignment
              </Typography>
              <Typography variant="h3" component="div">
                {data.waitingForAssignment}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Latest Announcement */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Latest Announcement
              </Typography>
              <Typography variant="body1" component="div">
                {data.latestAnnouncement}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Applicants */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Pending Applicants
              </Typography>
              <Typography variant="h3" component="div">
                {data.pendingApplicants}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Pending */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Total Pending
              </Typography>
              <Typography variant="h3" component="div">
                {data.totalPending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Dept Request */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Pending Dept Request
              </Typography>
              <Typography variant="h3" component="div">
                {data.pendingDeptRequest}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
