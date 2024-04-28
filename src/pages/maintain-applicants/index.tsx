import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';
import NavBar from '../../components/navbar'
import React, { useState } from 'react';

const MaintainApplicants: React.FC = () => {
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

    // Define applicants array
    const [applicants, setApplicants] = useState([
        { id: 1, name: 'John Doe', course: 'Computer Science', age: 25, gender: 'Male', contact: '1234567890', registerDate: '2024-03-05', status: 'Pending' },
        { id: 2, name: 'Jane Smith', course: 'Electrical Engineering', age: 28, gender: 'Female', contact: '0987654321', registerDate: '2024-03-07', status: 'Approved' },
        { id: 3, name: 'Jack Sparrow', course: 'Pirate', age: 28, gender: 'Male', contact: '0123123123', registerDate: '2024-03-4', status: 'Rejected' },
        // Add more applicants as needed
    ]);

    // Define handleViewApplicant function
    const handleViewApplicant = (applicant: any) => {
        // Add your logic here to handle viewing applicant details
        console.log('Viewing applicant:', applicant);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'grey';
            case 'Rejected':
                return 'red';
            case 'Approved':
                return 'green';
            default:
                return 'black'; // Default color
        }
    };
    return(
        <Box style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', minHeight:'100vh', width:'100%'}}>
            <NavBar activeTab={activeTab} handleTabChange={handleTabChange}></NavBar>
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
                    {activeTab === 'Applicants' && (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', borderBottom: '1px solid #818181', height: '10%' }}>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Name</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Course</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Age</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Gender</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contact</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Register Date</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Status</Typography>
                                <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Action</Typography>
                            </Box>
                            {/* Content */}
                            {applicants.map(applicant => (
                                <Box key={applicant.id} sx={{ display: 'flex', width: '100%', flexDirection: 'row', borderBottom: '1px solid #818181', padding: '20px', alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.name}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.course}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.age}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.gender}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.contact}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.registerDate}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center', color: getStatusColor(applicant.status)}}>{applicant.status}</Typography>
                                    <Button variant="outlined" style={{ flex: '0.8', textAlign: 'center', backgroundColor:'#0975bc', color:'white' }} onClick={() => handleViewApplicant(applicant)}>View</Button>
                                </Box>
                            ))}
                        </>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}

export default MaintainApplicants;