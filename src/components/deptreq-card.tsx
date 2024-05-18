import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface DeptReqCardProps {
    collegeName: string;
    requestType: string;
    quantity: number;
    status: string;
    onClick?: () => void;
  }
  

const DeptReqCard: React.FC<DeptReqCardProps> = ({ collegeName, requestType, quantity, status }) => {
  return (
    <Box>
      <Typography variant="h6">{collegeName}</Typography>
      <Typography>Request Type: {requestType}</Typography>
      <Typography>Quantity: {quantity}</Typography>
      <Typography>Status: {status}</Typography>
      <Button variant="contained" color="primary">View</Button>
    </Box>
  );
};

export default DeptReqCard;