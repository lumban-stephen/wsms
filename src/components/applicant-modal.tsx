import React, { useState } from 'react';
import { Applicant } from '../utils/interfaces';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import ApproveApplicantBox from '../components/approve-applicant'; // Import ApproveApplicantBox component
import { deepOrange } from '@mui/material/colors';


interface ApplicantModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: Applicant;
  onApplicantUpdate: (updatedApplicant: Applicant) => void; // Callback for applicant update
}

const ApplicantModal: React.FC<ApplicantModalProps> = ({
  isOpen,
  onClose,
  applicant,
  onApplicantUpdate,
}) => {

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const handleApproveClick = () => {
    console.log("Before: " + isApproveModalOpen)
    console.log(isOpen)
    setIsApproveModalOpen(true);
    console.log("after: " + isApproveModalOpen)
  };

  const handleApprove = async () => {
    try {
      const response = await fetch('http://localhost:3000/applicants/maintain-applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicant_fk: applicant.applicant_id }), // Replace with your logic to get applicant ID
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve applicant');
      }
  
      const data = await response.json();
      console.log('Approval response:', data);
  
      // Close the modal (assuming you have a function to close the modal)
      setIsApproveModalOpen(false);
  
      // Optionally, update applicant data in the frontend state or refetch data
    } catch (error) {
      console.error('Error approving applicant:', error);
      // Display an error message to the user
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this applicant?')) {
      try {
        const response = await fetch('http://localhost:3000/applicants/reject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ applicant_fk: applicant.applicant_id, status: 'denied' }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          alert(data.message);
          onApplicantUpdate({ ...applicant, status: 'denied' });
          setIsApproveModalOpen(false);
        } else {
          const errorData = await response.json();
          console.log('Error:', errorData);
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the request.');
      }
    }
  };

  return (
    <>
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', p: 4 }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <svg viewBox="0 0 100 100" width="16" height="16">
            <path d="M19 63c0 3.31-2.69 6-6 6s-6-2.69-6-6v-14c0-3.31 2.69-6 6-6s6 2.69 6 6v14zM50 50c7.73 0 14-6.27 14-14 0-7.73-6.27-14-14-14s-14 6.27-14 14c0 7.73 6.27 14 14 14z" />
          </svg>
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {/* Add avatar component here */}
            </Box>
          </Grid>
          <Avatar sx={{ bgcolor: deepOrange[500], width: 150, height: 150}} >N </Avatar>
          <Grid item xs={8}>
            <Typography variant="h6">{applicant.full_name}</Typography>
            <Typography variant="body2">{applicant.age}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Address" fullWidth value={applicant.address} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Last School Attended" fullWidth value={applicant.school_name} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Facebook Account" fullWidth value={applicant.fbAccount} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Contact Number" fullWidth value={applicant.contact} disabled />
          </Grid>
          {/* Add additional detail fields here */}
        </Grid>
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleApprove} disabled={applicant.status === 'accepted'}>
            Approve
          </Button>
          <Button variant="outlined" color="error" onClick={handleReject}>
            Reject
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
};

export default ApplicantModal;
