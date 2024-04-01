import React, {useState} from 'react';
import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';

const MainWSLists: React.FC = () => {

    const [applicants, setApplicants] = useState([
        { id: 1, name: 'John Doe', course: 'Computer Science', age: 25, gender: 'Male', contact: '1234567890', registerDate: '2024-03-05', status: 'Renewed' },
        { id: 2, name: 'Jane Smith', course: 'Electrical Engineering', age: 28, gender: 'Female', contact: '0987654321', registerDate: '2024-03-07', status: 'Pending' },
        { id: 3, name: 'Jack Sparrow', course: 'Pirate', age: 28, gender: 'Male', contact: '0123123123', registerDate: '2024-03-4', status: 'Retired' },
        { id: 4, name: 'Gregory House', course: 'Nursing', age: 28, gender: 'Male', contact: '0123123123', registerDate: '2024-03-4', status: 'Suspended' },
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
            case 'Retired':
                return 'red';
            case 'Suspended':
                return 'red';
            case 'Renewed':
                return 'green';
            default:
                return 'black'; // Default color
        }
    };

  return (
    <Box style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', minHeight:'100vh', width:'100%'}}>
        <Box style={{backgroundColor:'white', height:'87vh', width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'90%', minHeight:'73vh'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'100%', borderBottom: '1px solid #818181', height:'6%'}}>
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
            </Paper>
        </Box>
    </Box>
  );
}

export default MainWSLists;