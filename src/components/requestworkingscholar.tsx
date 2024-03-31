import React, { useState, ChangeEvent } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, SelectChangeEvent } from '@mui/material';

const RequestWorkingScholar: React.FC = () => {
  const [message, setMessage] = useState('');
  const [requestType, setRequestType] = useState('Admission');
  const [quantity, setQuantity] = useState(2);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleRequestTypeChange = (e: SelectChangeEvent<string>) => {
    setRequestType(e.target.value);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Message:', message);
    console.log('Request Type:', requestType);
    console.log('Quantity:', quantity);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '75vw',
        padding: 2,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Request a working scholar
      </Typography>
      <TextField
        label="Write a message here with brief explanation of your request"
        multiline
        rows={4}
        value={message}
        onChange={handleMessageChange}
        sx={{ width: '100%', marginBottom: 2 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography sx={{ marginRight: 2 }}>Request Type:</Typography>
        <Select
          value={requestType}
          onChange={handleRequestTypeChange}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="Admission">Admission</MenuItem>
          <MenuItem value="Replacement">Replacement</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography sx={{ marginRight: 2 }}>Quantity:</Typography>
        <Button
          variant="outlined"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <Typography sx={{ mx: 2 }}>{quantity}</Typography>
        <Button
          variant="outlined"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </Button>
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Send Request
      </Button>
    </Box>
  );
};

export default RequestWorkingScholar;