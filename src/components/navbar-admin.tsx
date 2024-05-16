import React, { useState } from 'react';
import '../components/navbarStyles.css';
import Logo from './uclmLogo'
import { Box, Divider, Avatar, Button, Menu, MenuItem, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    activeTab: string;
}

const NavBarAdmin: React.FC<NavBarProps>= ({activeTab}) =>{
    const navigate = useNavigate(); // Create a useNavigate constant

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
    return(
        <Box style={{backgroundColor:'#0975bc', height:'13vh', width: '100%',  display: 'flex', alignContent: 'center'}}> 
                <Box sx={{position: 'relative', paddingLeft:1}}>
                    <Logo width={210} height={130}/>
                </Box>
                {/*Tabs*/}
                {/*<NavBarDept activeTab={activeTab} handleTabChange={handleTabChange}/>*/}
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{flex:1}}>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Home' ? 'contained' : 'outlined'}
                        onClick={() => {
                            navigate('/dashboard');
                        }}>Home</Button>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Applicants' ? 'contained' : 'outlined'}
                        onClick={() => {navigate('/maintain-applicants');}}>Applicants</Button>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'WorkingScholars' ? 'contained' : 'outlined'}
                        onClick={() => navigate('/maintain-ws')}>Working Scholars</Button>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Departments' ? 'contained' : 'outlined'}
                        onClick={() => navigate('/maintain-dept')}>Departments</Button>   
                </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', height: '50px', margin: 'auto' }}/>
                        <Avatar sx={{ 
                            bgcolor: deepPurple[500], 
                            width: 56, 
                            height: 56,
                            marginLeft: 1,
                            marginRight:1
                            }}>A</Avatar>

                        <Button
                        sx={{marginRight:8, color:'white'}}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        Admin
                        </Button>                     
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>    
                        </Menu>    
                    </Box>
            </Box>
    );
}

export default NavBarAdmin;