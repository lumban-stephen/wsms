import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface UserProfileProps {
  name: string;
  age: number;
  address: string;
  contact: string;
  course: string;
  year: number;
  level: string;
  guardian: string;
  gender: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  age,
  address,
  contact,
  course,
  year,
  level,
  guardian,
  gender,
}) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar>{name.charAt(0)}</Avatar>
      <Box ml={2}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Age: {age}</Typography>
        <Typography variant="body2">Address: {address}</Typography>
        <Typography variant="body2">Contact: {contact}</Typography>
        <Typography variant="body2">Course: {course}</Typography>
        <Typography variant="body2">Year: {year}, Level: {level}</Typography>
        <Typography variant="body2">Guardian: {guardian}</Typography>
        <Typography variant="body2">Gender: {gender}</Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;