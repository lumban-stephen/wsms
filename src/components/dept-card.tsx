import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

interface DeptCardProps {
  imageUrl: string;
  departmentName: string;
  userType: string;
  deptContact: string;
  deptEmail: string;
}

const DeptCard: React.FC<DeptCardProps> = ({
  imageUrl,
  departmentName,
  userType,
  deptContact,
  deptEmail
}: DeptCardProps) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={imageUrl} alt={departmentName} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {departmentName}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default DeptCard;
