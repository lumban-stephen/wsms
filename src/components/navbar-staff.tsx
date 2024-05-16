import React, { useEffect, useState } from 'react';
import '../components/navbarStyles.css';
import Logo from './uclmLogo'
import { Box, Divider, Avatar, Button, Menu, MenuItem, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { jwtDecode } from 'jwt-decode';
import { User } from '../utils/user';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


interface NavBarProps {
    activeTab: string;
}

const NavBarStaff: React.FC<NavBarProps>= ({activeTab}) =>{
    //Profile Menu Start
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from localStorage
        navigate('/'); // Redirect to login page
      };
    //Profile Menu End

      // Username State
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  // Fetch username from token on component mount (assuming token is available)
    useEffect(() => {
        const storedToken = localStorage.getItem('token'); // Replace with your token storage mechanism
        if (storedToken) {
        try {
            const decodedToken = jwtDecode<User>(storedToken);
            setUsername(decodedToken.username);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
        }
    }, []);
    
    return (
        <Box style={{ backgroundColor: '#0975bc', height: '13vh', width: '100%', display: 'flex', alignContent: 'center' }}>
          <Box sx={{ position: 'relative', paddingLeft: 1 }}>
            <Logo width={210} height={130} />
          </Box>
          <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
            <Button
              sx={{ color: 'white' }}
              variant={activeTab === 'WorkingScholars' ? 'contained' : 'outlined'}
              onClick={() => navigate('/deptreq')}>
              Departments
            </Button>
            <Button
              sx={{ color: 'white' }}
              variant={activeTab === 'WorkingScholars' ? 'contained' : 'outlined'}
              onClick={() => navigate('/dept-profile')}>
              Working Scholars
            </Button>
    
            <Button
              sx={{ color: 'white' }}
              variant={activeTab === 'Announcements' ? 'contained' : 'outlined'}
              onClick={() => navigate('/dept-announce')}>
              Announcements
            </Button>
          </Grid>
                {/*Tabs End*/}
                {/*Profile Section*/}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', height: '50px', margin: 'auto' }} />
                    <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56, marginLeft: 1, marginRight: 1 }}>
                        {username ? username.charAt(0).toUpperCase() : 'U'}  {/* Display username initial or "U" */}
                    </Avatar>
                    <Button
                        sx={{ marginRight: 8, color: 'white' }}
                        onClick={handleLogout}
                    >
                        {username}  {/* Display username if available */}
                    </Button>
                    <Menu
                    id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}>
                            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>    
                    </Menu> 
                </Box>
            </Box>
    );
}

export default NavBarStaff;