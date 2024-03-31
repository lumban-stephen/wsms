import React, { useContext, useState } from 'react';
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, TextField, Typography } from '@mui/material';
import LoginImage from '../../assets/uclm-banner.jpg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import LoginSkeleton from '../../components/loginskeleton';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  localStorage.setItem('isLoggedIn', 'true');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Simulate backend validation (replace with actual backend call)
      if (username === 'admin' && password === '123') {
        setTimeout(() => {
          const successfulLogin = Math.random() > 0.5; // Simulate success/failure
          if (successfulLogin) {
            console.log('Login successful!');
            setIsAuthenticated(true);
            navigate('/register');
          }
          setIsLoading(false); // Hide loading indicator
        }, 1500);
      } else {
        setError('Invalid credentials');
        setIsLoading(false); // Reset isLoading to false when login fails
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoading(false); // Reset isLoading to false if an error occurs
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
                Working Scholar Management System
            </Typography>
            <form onSubmit={handleLogin}>
            <FormControl fullWidth>
              <InputLabel htmlFor="username" shrink={!!username} focused={!!username}>
                Username or Email
              </InputLabel>
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
            {isLoading ? (
              <LoginSkeleton/>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            )}
            {error && <FormHelperText error>{error}</FormHelperText>}
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Login;