import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

interface RequestDetailsProps {
  requestId: string;
  requestType: string;
  quantity: number;
  message: string; // Added prop for request message
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
  requestId,
  requestType,
  quantity,
  message,
}) => {
  const steps = [
    { label: 'Guidance Approval', isCompleted: false },
    { label: 'HR Approval', isCompleted: false },
    { label: 'CAD Approval', isCompleted: false },
    { label: 'UC Main Approval', isCompleted: false },
    { label: 'Clinic Approval', isCompleted: false },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '50%', p: 2 }}>
        <Box sx={{ display: 'flex', mb: 2 }}>
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: step.isCompleted ? 'primary.main' : 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: index === steps.length - 1 ? 0 : 2,
              }}
            >
              <Typography variant="body2" color={step.isCompleted ? 'white' : 'black'}>
                {step.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Request ID: {requestId}</Typography>
          <Typography variant="body1">Request Type: {requestType}</Typography>
          <Typography variant="body1">Quantity: {quantity}</Typography>
        </Box>
        <Button variant="contained" color="primary">
          Cancel Request
        </Button>
      </Box>
      <Box sx={{ width: '50%', p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="body1">{requestId}</Typography>
        <TextField
          label="Request Message"
          multiline
          rows={8}
          value={message} // Display the actual message from props
          disabled
          InputProps={{ style: { backgroundColor: 'grey.200' } }}
        />
      </Box>
    </Box>
  );
};

export default RequestDetails;