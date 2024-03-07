import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Logo from './uclmLogo'
import React, { useState } from 'react';
import { deepPurple } from '@mui/material/colors';

const MaintainWSEmpty: React.FC = () => {
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

    //Tab Swithing Start
    const [activeTab, setActiveTab] = useState('Home');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    //Tab Switching End
    };
    return(
        <Box style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', minHeight:'100vh', width:'100%'}}>
            <Box style={{backgroundColor:'#0975bc', height:'13vh', width: '100%',  display: 'flex', alignContent: 'center'}}> 
                <Box sx={{position: 'relative', paddingLeft:1}}>
                    <Logo width={210} height={130}/>
                </Box>
                {/*Tabs*/}
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{flex:1}}>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Home' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Home')}>Home</Button>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Applicants' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Applicants')}>Applicants</Button>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'WorkingScholars' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('WorkingScholars')}>Working Scholars</Button>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Departments' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Departments')}>Departments</Button>

                    <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Announcements' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Announcements')}>Announcements</Button>      
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
            {/*Content Per Page*/}                               
            <Box style={{backgroundColor:'white', height:'87vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'90%', minHeight:'73vh'}}>       
                    {activeTab === 'WorkingScholars' && (
                        <>
                            <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'100%', borderBottom: '1px solid #818181', height:'10%'}}>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Name</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Course</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Department</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contact</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contract Start</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contract End</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Status</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Action</Typography>                        
                            </Box>                    
                            {/*Content*/}
                            <Box style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight='bold'>Empty</Typography>
                            </Box>
                        </>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}

export default MaintainWSEmpty;