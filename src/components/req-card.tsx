import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface RequestCardProps {
  date: string;
  department: string;
  requestType: string;
  quantity: number;
  status: string;
}

const RequestCard: React.FC<RequestCardProps> = ({
  date,
  department,
  requestType,
  quantity,
  status,
}) => {
  return (
    <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        <Typography variant="h5" component="div">
          {department}
        </Typography>
        <Typography variant="body1">Request Type: {requestType}</Typography>
        <Typography variant="body1">Quantity: {quantity}</Typography>
        <Typography variant="body1">Status: {status}</Typography>
      </CardContent>
      <Button variant="contained" sx={{ alignSelf: 'flex-end', marginRight: 2, marginBottom: 2 }}>
        View
      </Button>
    </Card>
  );
};

export default RequestCard;