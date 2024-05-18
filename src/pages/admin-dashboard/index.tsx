import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import NavBarAdmin from '../../components/navbar-admin';

type DashboardData = {
  workingScholarsInService: number;
  waitingForAssignment: number;
  latestAnnouncement: string;
  pendingApplicants: number;
  totalRetired: number;
  pendingDeptRequest: number;
};

const defaultDashboardData: DashboardData = {
  workingScholarsInService: 0,
  waitingForAssignment: 0,
  latestAnnouncement: '',
  pendingApplicants: 0,
  totalRetired: 0,
  pendingDeptRequest: 0,
};

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(defaultDashboardData);
  const [isLoading, setIsLoading] = useState(true);
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/dashboard', {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      });
      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBarAdmin activeTab={'Home'} />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Working Scholars in service
                </Typography>
                <Typography variant="h3" component="div">
                  {dashboardData?.workingScholarsInService}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Waiting for assignment
                </Typography>
                <Typography variant="h3" component="div">
                  {dashboardData?.waitingForAssignment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Latest Announcement
                </Typography>
                <Typography variant="body1" component="div">
                  {dashboardData?.latestAnnouncement}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Pending Applicants
                </Typography>
                <Typography variant="h3" component="div">
                  {dashboardData?.pendingApplicants}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Total Retired
                </Typography>
                <Typography variant="h3" component="div">
                  {dashboardData?.totalRetired}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Pending Dept Request
                </Typography>
                <Typography variant="h3" component="div">
                  {dashboardData?.pendingDeptRequest}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;