import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

interface DeptCardProps {
  imageUrl: string;
  departmentName: string;
  departmentAdmin: string;  // Added departmentAdmin prop
  deptContact: string;  // Added deptContact prop
  deptEmail: string;  // Added deptEmail prop
}

const DeptCard = ({
  imageUrl,
  departmentName,
  departmentAdmin,
  deptContact,
  deptEmail
}: DeptCardProps) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={imageUrl} alt={departmentName} />
      <CardContent>
        <Typography variant="h5" component="div">
          {departmentName}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default DeptCard;
