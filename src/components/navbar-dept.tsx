import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';

interface navbardeptProps {
    activeTab: string;
    handleTabChange: (tab: string) => void;
}

const NavBarDept: React.FC<navbardeptProps> = ({activeTab, handleTabChange}) =>{
    return(
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
    );
}

export default NavBarDept;


//need in const


//const [activeTab, setActiveTab] = useState('Home');
//const handleTabChange = (tab: string) => {
//setActiveTab(tab);
//};

//check git branch maintainWSListNew index.tsx

//use navbar

// <NavBarDept activeTab={activeTab} handleTabChange={handleTabChange}/>


// show certain content on a tab
// {activeTab === 'WorkingScholars' && (    
// <>
// content here
// </>
// )

