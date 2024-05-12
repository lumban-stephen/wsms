import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';

interface DeptRequest {
    requestId: number;
    requestType: string;
    quantity: number;
    requestDetails: string;
    requestStatus: string; // e.g., "waiting", "approved", "rejected"
  }

interface ApproveReqProps {
    open: boolean;
    onClose: () => void;
    requestDetails?: DeptRequest;
  }

const steps = ['Submit Approval', 'HR Approval', 'CAD Approval', 'UC Main Approval', 'Clinic Approval'];

const ApproveReq: React.FC<ApproveReqProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleApprove = () => {
    // Handle approve logic here
    console.log('Request approved');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Request ID: 123456
        </Typography>
        <Typography variant="body1" gutterBottom>
          Request Date: May 12, 2024
        </Typography>
        <Typography variant="body1" gutterBottom>
          Request Type: Replacement
        </Typography>
        <Typography variant="body1" gutterBottom>
          Quantity: 5
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="error" onClick={onClose} sx={{ mr: 2 }}>
            Reject
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleApprove : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Approve' : 'Approve Step'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ApproveReq;