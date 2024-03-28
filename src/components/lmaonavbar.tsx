import React, { useState } from 'react';
import Logo from '../components/uclmLogo'
import { Box, Divider, Avatar, Button, Menu, MenuItem, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

interface Lmaonavbar {
    activeTab: string;
    handleTabChange: (tab: string) => void;
}

const Lmaonavbar: React.FC<Lmaonavbar>= ({activeTab, handleTabChange}) =>{
    //Profile Menu Start
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //Profile Menu End
    return(
        <Box style={{backgroundColor:'#286CA4', height:'13vh', width: '100%',  display: 'flex', alignContent: 'center'}}> 
                <Box sx={{position: 'relative', paddingLeft:1}}>
                    <Logo width={210} height={130}/>
                </Box>
                {/*Tabs*/}
                {/*<NavBarDept activeTab={activeTab} handleTabChange={handleTabChange}/>*/}
                <Grid container
                    direction="row"
                    marginLeft={20}
                    alignItems="center"
                    sx={{flex:1}}>

                    <Button sx={{
                        marginRight: 5,
                        color: 'white'
                        }}
                        variant={activeTab === 'Home' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Home')}>Home</Button>

                    <Button sx={{
                        marginRight: 5,
                        color: 'white'
                        }}
                        variant={activeTab === 'Applicants' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Applicants')}>Applicants</Button>

                    <Button sx={{
                        marginRight: 5,
                        color: 'white'
                        }}
                        variant={activeTab === 'Working Scholars' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Applicants')}>Working Scholars</Button>

                    <Button sx={{
                        marginRight: 5,
                        color: 'white'
                        }}
                        variant={activeTab === 'Departments' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Applicants')}>Departments</Button>

                    <Button sx={{
                        marginRight: 5,
                        color: 'white'
                        }}
                        variant={activeTab === 'Announcements' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Applicants')}>Announcements</Button>
  
                </Grid>
                {/*Tabs End*/}
                {/*Profile Section*/}
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
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>    
                        </Menu>    
                    </Box>
                    {/*Profile Section End*/}
            </Box>
    );
}

export default Lmaonavbar;