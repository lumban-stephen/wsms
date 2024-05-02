import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

interface WsCardModalProps {
  open: boolean;
  onClose: () => void;
  wsData: {
    name: string;
    department: string;
    address: string;
    lastSchoolAttended: string;
    facebookAccount: string;
    contactNo: string;
    guardianName: string;
    guardianContact: string;
    contractStart: string;
    contractEnd: string;
  };
}

const WsCardModal: React.FC<WsCardModalProps> = ({ open, onClose, wsData }) => {
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
        <TextField
          label="Guardian Name"
          value={wsData.guardianName}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Guardian Contact"
          value={wsData.guardianContact}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Contract Start"
          value={wsData.contractStart}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Contract End"
          value={wsData.contractEnd}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Update Info
        </Button>
        <Button color="error">Remove</Button>
        <Button color="error">Remove Contract</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WsCardModal;