import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';

interface Request {
  ws_req_id: number;
  ws_req_name: string;
  message: string;
  dept_name_fk: string;
  ws_req_stat: string;
  ws_req_type: string;
  quantity: number;
  date_created: string;
  approve_step?: number;
}

interface ApproveReqProps {
  onClose: () => void;
  requestDetails?: Request;
  open: boolean;
}

const steps = ['Submit Approval', 'HR Approval', 'CAD Approval', 'UC Main Approval', 'Clinic Approval'];

const ApproveReq: React.FC<ApproveReqProps> = ({ onClose, requestDetails, open }) => {
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
        <Box>
          <Typography variant="h6" gutterBottom>
            Request ID: {requestDetails?.ws_req_id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Request Date: {requestDetails?.date_created}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Request Type: {requestDetails?.ws_req_type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Quantity: {requestDetails?.quantity}
          </Typography>

          <Stepper activeStep={requestDetails?.approve_step} alternativeLabel>
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
      </Box>
    </Modal>
  );
};

export default ApproveReq;
