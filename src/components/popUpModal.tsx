import { Paper, Box, Typography, Avatar, Button } from '@mui/material';
import React, { useState, useMemo } from 'react';

interface ModalProps {
    info: {
        Name: string;
        age: string;
        Department: string;
        Gender: string;
        Address: string;
        LastSchool: string;
        FacebookAccount: string;
        ContactNumber: string;
        GuardianName: string;
        GuardianContact: string;
        photo: string; // Assuming photo is a URL to the image
        status: string;
        
    };
    onClose: () => void;
    onStatusChange: (updatedApplicant: any) => void; // Callback function
}

const Modal: React.FC<ModalProps> = ({ info, onClose, onStatusChange }) => {
    const [modalOpen, setModalOpen] = useState(false); // Declare modalOpen state variable

    const getAbbrev = (course: string) => {
        switch (course) {
            case 'Computer Science':
                return 'BSCS';
            case 'Information Technology':
                return 'BSIT';
            case 'Electrical Engineering':  
                return 'BSECE';
            case 'Biology':
                return 'BSBIO';
            default:
                return '';
        }
    };

    const getAbbrevMemoized = useMemo(() => getAbbrev, []);

    const handleApprove = () => {
        const updatedApplicant = { ...info, status: 'Approved' };
        onStatusChange(updatedApplicant); // Call the callback function
        onClose();
    };
    

    const handleReject = () => {
        const updatedApplicant = { ...info, status: 'Rejected' };
        onStatusChange(updatedApplicant); // Call the callback function
        onClose();
    };

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
            <Paper elevation={22} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '30%', minHeight: '73vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Avatar alt={info.Name} src={info.photo} sx={{ width: 250, height: 250, mr: 2, mt: 5}} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Typography variant="h6">{info.Name}, <span style={{ color: 'grey'}}>{info.age}</span></Typography>
                        </Box>                 
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Typography style={{ color: 'grey' }} variant="h6">{getAbbrevMemoized(info.Department)}, {info.Gender}</Typography>
                            <Typography style={{color: 'grey'}} variant="h6"></Typography>
                        </Box>
                    </Box>
                </Box>
                <Box style={{width: '100%'}} sx={{ml: 5}}>
                    <Typography variant="body1">Address: {info.Address}</Typography>
                    <Typography variant="body1">Last School: {info.LastSchool}</Typography>
                    <Typography variant="body1">Facebook Account: {info.FacebookAccount}</Typography>
                    <Typography variant="body1">Contact Number: {info.ContactNumber}</Typography>
                    <Typography variant="body1">Guardian Name: {info.GuardianName}</Typography>
                    <Typography variant="body1">Guardian Contact: {info.GuardianContact}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" color="primary" sx={{mr:2}} onClick={() => handleApprove()}>Approve</Button>
                    <Button variant="contained" color="primary" sx={{mr:2}} onClick={() => handleReject()}>Reject</Button>
                    <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
                </Box>
            </Paper>
        </div>
    );
}

export default Modal;
