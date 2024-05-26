import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface WsCardModalProps {
  open: boolean;
  onClose: () => void;
  wsData: {
    applicant_fk?: number;
    name: string;
    department: string;
    address: string;
    lastSchoolAttended: string;
    facebookAccount: string;
    contactNo: string;
  };
}

const WsCardModal: React.FC<WsCardModalProps> = ({ open, onClose, wsData }) => {
  const navigate = useNavigate();

  const handleImmediateSuspension = async () => {
    const confirmSuspension = window.confirm("Are you sure you want to immediately suspend this working scholar?");
    if (confirmSuspension) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ applicant_fk: wsData.applicant_fk })
      };
  
      try {
        const response = await fetch(`http://localhost:3000/ws/suspend`, requestOptions);
        if (!response.ok) {
          console.log(response);
          console.log(wsData.applicant_fk)
          throw new Error('Failed to suspend working scholar');
        }
        window.alert("Successfully Suspended Working Scholar");
        navigate("/dept-announce");
      } catch (error) {
        console.error('Error suspending working scholar:', error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{wsData.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom>
          {wsData.department}
        </Typography>
        <TextField
          label="Address"
          value={wsData.address}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Last School Attended"
          value={wsData.lastSchoolAttended}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Facebook Account"
          value={wsData.facebookAccount}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Contact #"
          value={wsData.contactNo}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleImmediateSuspension}>Immediate Suspension</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WsCardModal;
