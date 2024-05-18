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
import { deepOrange } from '@mui/material/colors';

interface WsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workingScholar: Applicant;
  onWsUpdate: (updatedWs: Applicant) => void;
}

const WsModal: React.FC<WsModalProps> = ({
  isOpen,
  onClose,
  workingScholar,
  onWsUpdate,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedWorkingScholar, setUpdatedWorkingScholar] = useState<Applicant>(workingScholar);

  const handleUpdateInfo = () => {
    setIsEditMode(true);
    // Add logic to enable editing of fields
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:3000/applicants/maintain-ws', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkingScholar),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        alert(data.message);
        onWsUpdate(updatedWorkingScholar); // Update the working scholar with the new data
        setIsEditMode(false); // Disable edit mode after saving changes
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    }
  };


  const handleSuspend = async () => {
    try {
      const updatedWs = { ...workingScholar, status: 'Suspended' };
      const response = await fetch('http://localhost:3000/applicants/suspend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicant_fk: updatedWs.applicant_id }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        alert(data.message);
        onWsUpdate(updatedWs); // Update the working scholar with the new status
        onClose(); // Close the modal after updating
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
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
            <Avatar sx={{ bgcolor: deepOrange[500], width: 150, height: 150 }}>N</Avatar>
            <Grid item xs={8}>
              <Typography variant="h6">{workingScholar.full_name}</Typography>
              <Typography variant="body2">{workingScholar.age}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                value={workingScholar.address}
                disabled={!isEditMode || workingScholar.status === 'Suspended'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last School Attended"
                fullWidth
                value={workingScholar.school_name}
                disabled={!isEditMode || workingScholar.status === 'Suspended'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Facebook Account"
                fullWidth
                value={workingScholar.fbAccount}
                disabled={!isEditMode || workingScholar.status === 'Suspended'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                fullWidth
                value={workingScholar.contact}
                disabled={!isEditMode || workingScholar.status === 'Suspended'}
              />
            </Grid>
            {/* Add additional detail fields here */}
          </Grid>
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateInfo}
              disabled={workingScholar.status === 'Suspended'}
            >
              {workingScholar.status === 'Suspended' ? 'Suspended' : 'Update Info'}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleSuspend}
              disabled={workingScholar.status === 'Suspended'}
            >
              {workingScholar.status === 'Suspended' ? 'Suspended' : 'Suspend'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WsModal;