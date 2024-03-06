import { Paper, Typography, Box } from '@mui/material';
import React from 'react';

const MaintainWSEmpty: React.FC = () => {
    return(
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', minHeight:'100vh', width:'100%'}}>
            <div style={{backgroundColor:'#0975bc', minHeight:'15vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            </div>
            <div style={{backgroundColor:'white', minHeight:'85vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'90%'}}>
                    <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'100%', borderBottom: '1px solid #818181'}}>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Name</Typography>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Course</Typography>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Department</Typography>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contact</Typography>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contract Start</Typography>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contract End</Typography>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Status</Typography>
                        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Action</Typography>
                    </Box>
                </Paper>
            </div>
        </div>
    );
}

export default MaintainWSEmpty;