import React, { useContext, useState } from 'react';
import Logo from '../components/uclmLogo';
import { Box, Divider, Avatar, Button, Menu, MenuItem, Grid, Tooltip, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

interface NavBarProps {
    activeTab: string;
    handleTabChange: (tab: string) => void;
}





const Lmaonavbar: React.FC<NavBarProps> = ({ activeTab, handleTabChange }) => {
    // Profile Menu Start
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Profile Menu End

    // User Menu Start
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        navigate('/');
        setIsAuthenticated(false);
    }
    // User Menu End

    return (
        <Box style={{ backgroundColor: '#286CA4', height: '13vh', width: '100%', display: 'flex', alignContent: 'center' }}>
            <Box sx={{ position: 'relative', paddingLeft: 1 }}>
                <Logo width={210} height={130} />
            </Box>
            {/* Tabs */}
            <Grid container 
            direction="row" 
            marginLeft={20} 
            alignItems="center" 
            sx={{ flex: 1 }}>
                
                <Tooltip title="Home">
                <Button
                    sx={{ marginRight: 5, color: 'white' }}
                    variant={activeTab === 'Home' ? 'contained' : 'text'}
                    onClick={() => {handleTabChange('Home'); navigate('/welcome')}}
                >
                    Home
                </Button>
                </Tooltip>

                <Tooltip title="Applicants">
                <Button
                    sx={{ marginRight: 5, color: 'white' }}
                    variant={activeTab === 'Applicants' ? 'contained' : 'text'}
                    onClick={() => {handleTabChange('Applicants'); navigate('/welcome')}}
                >
                    Applicants
                </Button>
                </Tooltip>

                <Tooltip title="Working Scholars">
                <Button
                    sx={{ marginRight: 5, color: 'white' }}
                    variant={activeTab === 'Working Scholars' ? 'contained' : 'text'}
                    onClick={() => {handleTabChange('Working Scholars'); navigate('/maintainWS')}}
                >
                    Working Scholars
                </Button>
                </Tooltip>

                <Tooltip title="Departments">
                <Button
                    sx={{ marginRight: 5, color: 'white' }}
                    variant={activeTab === 'Departments' ? 'contained' : 'text'}
                    onClick={() => {handleTabChange('Departments'); navigate('/deptreq')}}
                >
                    Departments
                </Button>
                </Tooltip>

                <Tooltip title="Announcements">
                <Button
                    sx={{ marginRight: 5, color: 'white' }}
                    variant={activeTab === 'Announcements' ? 'contained' : 'text'}
                    onClick={() => {handleTabChange('Announcements'); navigate('/dept-announce')}}
                >
                    Announcements
                </Button>
                </Tooltip>
            </Grid>
            {/* Tabs End */}
            {/* Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', height: '50px', margin: 'auto' }} />
                <Tooltip title="Account">
                    <Button sx={{ p: 0 ,marginRight: 8, color: 'white' }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>

                        <Avatar sx={{
                                bgcolor: deepPurple[500], 
                                width: 56,
                                height: 56,
                                marginLeft: 1,
                                marginRight: 1,
                            }}
                        >
                            A
                        </Avatar>
                            Admin
                    </Button>
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                
            </Box>
            {/* Profile Section End */}
        </Box>
    );
};

export default Lmaonavbar;
