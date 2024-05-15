import React, { useContext, useState } from 'react';
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, TextField, Typography } from '@mui/material';
import LoginImage from '../../assets/uclm-banner.jpg';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import LoginSkeleton from '../../components/loginskeleton';
import { AuthContext } from '../../utils/AuthContext';
import { User } from '../../utils/interfaces';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Validate input fields
      if (!username || !password) {
        setError('Username and password are required');
        return;
      }
  
      // Show a loading state or spinner to indicate the login process
      setLoading(true);
      setError('');
  
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          const { token } = data;
  
          // Store the JWT token in local storage or state management solution
          localStorage.setItem('token', token);
          console.log('token is: ' + token);
  
          // Decode the token to get the user information
          const decodedToken = jwtDecode<User>(token) as User;
          const { user_id, username, password, userType, deptName } = decodedToken;
  
          console.log('decoded token is: ' , JSON.stringify(decodedToken));
  
          // Store user data in state or context for further use
          setUser(decodedToken);
  
          // Authentication for navbar
          setIsAuthenticated(true); // Update isAuthenticated state
  
          console.log(decodedToken.userType)

          // Redirect to the profile page or another authenticated route
          if (decodedToken && decodedToken.userType) {
            console.log(decodedToken + "is the decoded token. " + "and the user type is: " +decodedToken.userType);
            if (decodedToken.userType === "staff") {
              navigate('/dept-announce');
            } else if (decodedToken.userType === "admin") {
              await navigate('/dashboard');
            } else if (decodedToken.userType === "ws"){
              navigate('/welcome');
            }
          }

        } else {
          setError('Invalid response from the server');
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || response.statusText;
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8} style={{ position: 'relative' }}>
        <img src={LoginImage} alt="Login banner" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
        <Typography variant="h3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          University of Cebu
        </Typography>
        <Typography style={{ position: 'absolute', top: '56%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          Lapu-Lapu and Mandaue
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Container style={{ color: 'black', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>
            <Typography variant= "h3" style={{ marginBottom: '15%', color: 'Black' }}>
                Working Scholar Management System
            </Typography>
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
            {loading ? (
              <LoginSkeleton/>
            ) : (
              <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            )}
            <Typography variant="body1" style={{ position: 'absolute', bottom: '10%', left: '92%', transform: 'translate(-50%, -50%)', color: 'white' }}> 
                <Link to={'/register'}> Apply for Working Scholarship </Link> 
            </Typography>
            {error && <FormHelperText error>{error}</FormHelperText>}
          </div>
          
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;