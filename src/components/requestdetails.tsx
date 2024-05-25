import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

interface RequestDetailsProps {
  requestId: string;
  requestType: string;
  quantity: number;
  message: string; // Added prop for request message
  requestStatus?: string; // Optional prop for request status
  currentStep: number;
  onCancelRequest?: () => void; // Optional callback function for success
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
  requestId,
  requestType,
  quantity,
  message,
  requestStatus,
  currentStep,
  onCancelRequest,
}) => {
  const steps = [
    { label: 'Guidance Approval', isCompleted: false },
    { label: 'HR Approval', isCompleted: false },
    { label: 'CAD Approval', isCompleted: false },
    { label: 'UC Main Approval', isCompleted: false },
    { label: 'Clinic Approval', isCompleted: false },
  ];
  const [isCancelling, setIsCancelling] = useState(false); // State for cancellation progress

  const handleCancelRequest = async () => {
    setIsCancelling(true); // Set cancelling state

    try {
      const response = await fetch(`http://localhost:3000/requests/cancel/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ws_req_stat: 'cancelled' }), // Update status to "cancelled"
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel request: ${response.status} ${response.statusText}`);
      }

      console.log('Request cancelled successfully.');

      if (onCancelRequest) {
        onCancelRequest(); // Call optional callback if provided
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
    } finally {
      setIsCancelling(false); // Reset cancelling state
    }
  };

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
                bgcolor:
                  index <= currentStep ? 'primary.main' : step.isCompleted ? 'primary.main' : 'grey.400', // Highlight current and previous steps
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: index === steps.length - 1 ? 0 : 2,
              }}
            >
              <Typography variant="body2" color={step.isCompleted || index <= currentStep ? 'white' : 'black'}>
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
        <Button
          variant="contained"
          color="primary"
          disabled={requestStatus !== 'waiting' || !requestStatus} // Disable if approved or no status
          onClick={handleCancelRequest}
        >
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
