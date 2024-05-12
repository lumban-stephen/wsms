import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface WsCardProps {
  imageUrl?: string; // Optional if using blue background
  name: string;
  department: string;
  onClick?: () => void;
  style?: React.CSSProperties; // Add style prop
}

const WsCard: React.FC<WsCardProps> = ({ imageUrl, name, department }) => {
  return (
    <Card sx={{ maxWidth: 200, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" align="center">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {department}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WsCard;