import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface ApproveApplicantBoxProps {
  onApprove: () => void;
  onReject: () => void;
}

const ApproveApplicantBox: React.FC<ApproveApplicantBoxProps> = ({ onApprove, onReject }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Typography variant="body1" gutterBottom>
        Are you sure you want to approve this applicant?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onApprove}
          sx={{ mr: 2 }}
        >
          Yes
        </Button>
        <Button variant="outlined" color="primary" onClick={onReject}>
          No
        </Button>
      </Box>
    </Box>
  );
};

export default ApproveApplicantBox;