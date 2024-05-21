import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface WsCardProps {
  imageUrl?: string; // Optional image URL
  name: string;
  department: string;
  onClick?: () => void;
  style?: React.CSSProperties; // Add style prop
}

const WsCard: React.FC<WsCardProps> = ({ imageUrl, name, department, onClick, style }) => {
  return (
    <Card sx={{ maxWidth: 200, display: 'flex', flexDirection: 'column', ...style }}>
      {imageUrl ? ( // Render CardMedia with image if URL provided
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={name}
        />
      ) : (
        // Render blue background with name as text if no image URL
        <CardContent
          sx={{
            height: '140px',
            backgroundColor: 'blue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div" align="center" color="white">
            {name}
          </Typography>
        </CardContent>
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WsCard;
