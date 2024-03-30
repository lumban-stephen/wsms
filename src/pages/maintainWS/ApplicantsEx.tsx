import { Paper, Typography, Box, Grid, Container, Button, Avatar, Divider, Menu } from '@mui/material';
import NavBar from '../../components/navbar'
import Modal from '../../components/popUpModal'
import React, { useState } from 'react';

const MaintainWS: React.FC = () => {
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
        { 
            id: 1, 
            Name: 'John Doe', 
            Department: 'Computer Science', 
            age: 25, 
            Gender: 'Male', 
            Contact: '1234567890', 
            registerDate: '2024-03-05', 
            status: 'Pending',
            Address: '123 Main St',
            LastSchool: 'ABC High School',
            FacebookAccount: 'john.doe',
            ContactNumber: '1234567890',
            GuardianName: 'Jane Doe',
            GuardianContact: '9876543210'
        },
        { 
            id: 2, 
            Name: 'Jane Smith', 
            Department: 'Electrical Engineering', 
            age: 28, 
            Gender: 'Female', 
            Contact: '0987654321', 
            registerDate: '2024-03-07', 
            status: 'Approved',
            Address: '456 Elm St',
            LastSchool: 'XYZ High School',
            FacebookAccount: 'jane.smith',
            ContactNumber: '0987654321',
            GuardianName: 'John Smith',
            GuardianContact: '0123456789'
        },
        { 
            id: 3, 
            Name: 'Jack Sparrow', 
            Department: 'Pirate', 
            age: 28, 
            Gender: 'Male', 
            Contact: '0123123123', 
            registerDate: '2024-03-04', 
            status: 'Rejected',
            Address: '789 Oak St',
            LastSchool: 'Pirate Academy',
            FacebookAccount: 'jack.sparrow',
            ContactNumber: '0123123123',
            GuardianName: 'Pirate King',
            GuardianContact: '9876543210'
        },
        { 
            id: 4, 
            Name: 'Emily Johnson', 
            Department: 'Biology', 
            age: 22, 
            Gender: 'Female', 
            Contact: '0123456789', 
            registerDate: '2024-03-10', 
            status: 'Pending',
            Address: '321 Maple St',
            LastSchool: 'Biology Institute',
            FacebookAccount: 'emily.johnson',
            ContactNumber: '0123456789',
            GuardianName: 'David Johnson',
            GuardianContact: '0123456789'
        },
        { 
            id: 5, 
            Name: 'Michael Brown', 
            Department: 'Chemistry', 
            age: 30, 
            Gender: 'Male', 
            Contact: '0987654321', 
            registerDate: '2024-03-12', 
            status: 'Approved',
            Address: '987 Pine St',
            LastSchool: 'Chemistry College',
            FacebookAccount: 'michael.brown',
            ContactNumber: '0987654321',
            GuardianName: 'Sarah Brown',
            GuardianContact: '0987654321'
        },
        // Add more applicants as needed
    ]);
    
    

    //popupmodal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null); // State to hold the selected applicant

    const handleStatusChange = (updatedApplicant: any) => {
        setApplicants(prevApplicants => prevApplicants.map(applicant => {
            if (applicant.id === updatedApplicant.id) {
                return updatedApplicant;
            }
            return applicant;
        }));
    };

    // Define handleViewApplicant function
    const handleViewApplicant = (applicant: any) => {
        setSelectedApplicant(applicant);
        setModalOpen(true);
        console.log('Viewing applicant:', applicant);
    };

    const handleCloseViewApplicant = () => {
        setSelectedApplicant(null);
        setModalOpen(false);
    };

    //popupmodal end

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
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.Name}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.Department}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.age}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.Gender}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.Contact}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.registerDate}</Typography>
                                    <Typography variant='h5' style={{ flex: '1', textAlign: 'center', color: getStatusColor(applicant.status)}}>{applicant.status}</Typography>
                                    <Button variant="outlined" style={{ flex: '0.8', textAlign: 'center', backgroundColor:'#0975bc', color:'white' }} onClick={() => handleViewApplicant(applicant)}>View</Button>
                                </Box>                
                            ))}
                                {modalOpen && selectedApplicant && <Modal info={selectedApplicant} onClose={handleCloseViewApplicant} onStatusChange={handleStatusChange} />}
                        </>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}

export default MaintainWS;