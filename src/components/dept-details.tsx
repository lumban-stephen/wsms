import React from 'react';
import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';

interface RequestHistoryItemProps {
  requestType: string;
  date: string;
}

interface DeptDetailsProps {
  departmentName: string;
  contactDetails: string;
  email: string;
  requestHistory: RequestHistoryItemProps[];
}

const RequestHistoryItem: React.FC<RequestHistoryItemProps> = ({ requestType, date }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography variant="body1">{requestType}</Typography>
      <Typography variant="body2" color="text.secondary">
        {date}
      </Typography>
    </Box>
  );
};

const DeptDetails: React.FC<DeptDetailsProps> = ({
  departmentName,
  contactDetails,
  email,
  requestHistory,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {departmentName}
        </Typography>
        <Typography variant="body1">{contactDetails}</Typography>
        <Typography variant="body1">{email}</Typography>
        <Box mt={2} mb={1}>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Request History
          </Typography>
          {requestHistory.map((request, index) => (
            <RequestHistoryItem
              key={index}
              requestType={request.requestType}
              date={request.date}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeptDetails;