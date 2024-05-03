import React, { useState } from 'react';
import '../components/navbarStyles.css';
import Logo from '../components/uclmLogo';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Box, Divider, Avatar, Button, Menu, MenuItem, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

interface NavBarProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const NavBarWS: React.FC<NavBarProps> = ({ activeTab, handleTabChange }) => {
  const navigate = useNavigate(); // Create a useNavigate constant

  // Profile Menu Start (unchanged)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Profile Menu End

  return (
    <Box style={{ backgroundColor: '#0975bc', height: '13vh', width: '100%', display: 'flex', alignContent: 'center' }}>
      <Box sx={{ position: 'relative', paddingLeft: 1 }}>
        <Logo width={210} height={130} />
      </Box>

      {/* Tabs */}
      <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
        <Button
          sx={{ color: 'white' }}
          variant={activeTab === 'Home' ? 'contained' : 'outlined'}
          onClick={() => {
            handleTabChange('Home'); // Call handleTabChange for internal state change
            navigate('/home'); // Use navigate to redirect to the desired route
          }}
        >
          Home
        </Button>

        <Button
          sx={{ color: 'white' }}
          variant={activeTab === 'Departments' ? 'contained' : 'outlined'}
          onClick={() => {
            handleTabChange('Departments');
            navigate('/departments');
          }}
        >
          Departments
        </Button>

        <Button
          sx={{ color: 'white' }}
          variant={activeTab === 'Announcements' ? 'contained' : 'outlined'}
          onClick={() => {
            handleTabChange('Announcements');
            navigate('/ws-announce');
          }}
        >
          Announcements
        </Button>
      </Grid>
      {/* Tabs End */}

      {/* Profile Section (unchanged) */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', height: '50px', margin: 'auto' }} />
        <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56, marginLeft: 1, marginRight: 1 }}>A</Avatar>

        <Button sx={{ marginRight: 8, color: 'white' }} id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
          WS
        </Button>

        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
      {/* Profile Section End */}
    </Box>
  );
};

export default NavBarWS;