import React, { useState } from 'react';
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, TextField, Typography } from '@mui/material';
import LoginImage from '../../assets/uclm-banner.jpg';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setError(errorData.message || 'Registration failed');
        } else {
          // Handle non-JSON responses (e.g., HTML)
          const errorText = await response.text();
          setError(`Registration failed non-JSON response: ${errorText}`);
        }
      } else {
        const user = await response.json();
        console.log("Successful registration", user);
        // Handle successful registration (e.g., redirect to login page)
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError('Registration failed');
    }
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
                Signup Page
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel htmlFor="username" shrink={!!username} focused={!!username}>Username or Email</InputLabel>
              <TextField
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="password" shrink={!!password} focused={!!password}>Password</InputLabel>
              <TextField
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <FormHelperText error>{error}</FormHelperText>}
            <Button variant="contained" color="primary" onClick={handleSignup}>
              Sign up
            </Button>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Signup;