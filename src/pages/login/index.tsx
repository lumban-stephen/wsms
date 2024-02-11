import React, { useState } from 'react';
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, TextField, Typography } from '@mui/material';
import LoginImage from '../../assets/uclm-banner.jpg';
import prisma from '../../db/prisma';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    prisma;
  };

  return (
    <Grid container>
      {/* Image Section */}
      <Grid item xs={12} md={8} style={{ position: 'relative' }}>
        <img src={LoginImage} alt="Login banner" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
        <Typography variant="h3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          University of Cebu
        </Typography>
        <Typography style={{ position: 'absolute', top: '56%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          Lapu-Lapu and Mandaue
        </Typography>
      </Grid>
      {/* Login Section */}
      <Grid item xs={12} md={4}>
        <Container style={{ color: 'black', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>
            <Typography variant= "h3" style={{ marginBottom: '15%', color: 'Black' }}>
                Working Scholar Management System
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel htmlFor="username">Username or Email</InputLabel>
              <TextField
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <TextField
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <FormHelperText error>{error}</FormHelperText>}
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Login;