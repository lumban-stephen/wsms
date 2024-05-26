import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface WsCardProps {
  imageUrl?: string; // Optional image URL
  name?: string;
  department: string;
  onClick?: () => void;
  style?: React.CSSProperties; // Add style prop
}

const WsCard: React.FC<WsCardProps> = ({ imageUrl, name, department, onClick, style }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    img.style.display = 'none'; // Hide the broken image
    const parent = img.parentElement;
    if (parent) {
      parent.style.backgroundColor = 'blue'; // Set background color to blue
      parent.style.display = 'flex'; // Set display to flex
      parent.style.justifyContent = 'center'; // Center content horizontally
      parent.style.alignItems = 'center'; // Center content vertically
      parent.style.height = '140px'; // Set height to 140px
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default', // Optional cursor change
        ...style,
      }}
      onClick={onClick} // Handle click event
    >
      {imageUrl ? (
        // Render CardMedia with image if URL provided
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={name}
          onError={handleImageError} // Handle image load error
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
          <Typography variant="body2" color="text.secondary" align="center">
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
