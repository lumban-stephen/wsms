import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface DeptCardProps {
  imageUrl: string;
  departmentName: string;
}

const DeptCard: React.FC<DeptCardProps> = ({ imageUrl, departmentName }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Department"
      />
      <CardContent>
        <Typography variant="h5" component="div" align="center">
          {departmentName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DeptCard;