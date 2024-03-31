import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface RequestDetailsProps {
  requestId: string;
  requestType: string;
  quantity: number;
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
  requestId,
  requestType,
  quantity,
}) => {
  const steps = [
    { label: 'Approved', isCompleted: true },
    { label: 'Approved', isCompleted: true },
    { label: 'Approved', isCompleted: false },
    { label: 'UC Man\nApproved', isCompleted: false },
    { label: 'CITC\nApproved', isCompleted: false },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
  );
};

export default RequestDetails;