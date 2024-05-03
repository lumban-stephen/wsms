import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';


const requestData = {
    requestId: 'REQ-123',
    requestDate: '2023-05-01',
    requestType: 'Equipment Request',
    quantity: 10,
    approvedSteps: 2, // Number of approved steps
    currentStep: 2, // Index of the current step
  };

  
const RequestApprovalModal = ({ open, onClose, requestData, onApprove, onReject }) => {
  const steps = [
    'Admin Approval',
    'HR Approval',
    'CAD Approval',
    'UC Main Approval',
    'Clinic Approval',
  ];

  const getStepStatus = (index) => {
    const approvedSteps = requestData.approvedSteps;
    const currentStep = requestData.currentStep;

    if (index < approvedSteps) {
      return 'completed';
    } else if (index === currentStep) {
      return 'active';
    } else {
      return 'disabled';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Request Approval</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Request ID: {requestData.requestId}</Typography>
        <Typography variant="subtitle1">Request Date: {requestData.requestDate}</Typography>
        <Typography variant="subtitle1">Request Type: {requestData.requestType}</Typography>
        <Typography variant="subtitle1">Quantity: {requestData.quantity}</Typography>
        <Box mt={2}>
          <Stepper alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} active={getStepStatus(index) === 'active'} completed={getStepStatus(index) === 'completed'}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject} color="error">
          Reject
        </Button>
        <Button onClick={onApprove} color="primary" disabled={requestData.currentStep === steps.length - 1}>
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestApprovalModal;