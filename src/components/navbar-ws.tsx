import React, { useState } from 'react';
//import '../components/navbarStyles.css';
import Logo from '../components/uclmLogo'
import { Box, Divider, Avatar, Button, Menu, MenuItem, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

interface NavBarWSProps {
    activeTab: string;
    handleTabChange: (tab: string) => void;
}

const NavBarWS: React.FC<NavBarWSProps>= ({activeTab, handleTabChange}) =>{
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
                        onClick={() => handleTabChange('Home')}>Home</Button>

                        <Button sx={{
                        color: 'white'
                        }}
                        variant={activeTab === 'Home' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('Home')}>Attendance</Button>        
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
                            }}>G</Avatar>

                        <Button
                        sx={{marginRight:8, color:'white'}}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        Gregory
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

export default NavBarWS;

//declare this

//Tab Swithing Start
// const [activeTab, setActiveTab] = useState('Home');
// const handleTabChange = (tab: string) => {
// setActiveTab(tab);
//Tab Switching End


// to use

// <NavBar activeTab={activeTab} handleTabChange={handleTabChange} />


/* Per Tab, use if needed

{activeTab === 'WorkingScholars' && (
<>
content here
</>
)}

*/