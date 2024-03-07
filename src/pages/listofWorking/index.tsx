import { Paper, Typography, Box, Grid, Container, Button } from '@mui/material';
import Logo from './uclmLogo'
import React from 'react';

const MaintainWSEmpty: React.FC = () => {
    return(
        <Box style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', minHeight:'100vh', width:'100%'}}>
            <Box style={{backgroundColor:'#0975bc', height:'13vh', width: '100%',  display: 'flex', alignContent: 'flex-start', }}>
            <Box sx={{position: 'absolute', paddingLeft:1}}>
                    <Logo width={210} height={130}/>
            </Box>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">

                    <Button sx={{color: 'white'}}>Home</Button>
                    <Button sx={{color: 'white'}}>Applicants</Button>
                    <Button sx={{color: 'white'}}>Working Scholars</Button>
                    <Button sx={{color: 'white'}}>Departments</Button>
                    <Button sx={{color: 'white'}}>Announcements</Button>      

                </Grid>
            </Box>                               
            <Box style={{backgroundColor:'white', height:'87vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'90%', minHeight:'73vh'}}>
                    {/*Headings*/}
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
                </Paper>
            </Box>
        </Box>
    );
}

export default MaintainWSEmpty;