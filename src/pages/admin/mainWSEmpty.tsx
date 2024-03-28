import React, {useState} from 'react';
import { Box, Divider, Avatar, Button, Menu, MenuItem, Grid, Tooltip, IconButton, Typography, Paper, Modal, TextField } from '@mui/material';
import Navbar from '../../components/lmaonavbar';


const MainWSEmpty: React.FC = () => {

    
    const [activeTab, setActiveTab] = useState('Working Scholars');
    const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    };
  return (
    <Box style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', minHeight:'100vh', width:'100%'}}>
            
            {/*Content Per*/}                               
            <Box style={{backgroundColor:'white', height:'87vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'90%', minHeight:'73vh'}}>       
                    {/*use navbar*/}
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
  )
}

export default MainWSEmpty
