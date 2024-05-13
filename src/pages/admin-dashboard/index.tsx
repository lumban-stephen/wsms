import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const AdminDashboard = () => {
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
                1146
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
                5236
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
                Lorem ipsum, lorem, ipsum, lorem, to lorem ipsum, lorem ipsum lorem, lorem ipsum lorem. Lorem, ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
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
                523
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
                250
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
                16
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;