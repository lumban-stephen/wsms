import React, { useState, ChangeEvent } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, SelectChangeEvent } from '@mui/material';
import { Props } from '../utils/interfaces';

const RequestWorkingScholar: React.FC<Props> = ({ deptFk, username }) => {
  const [message, setMessage] = useState('');
  const [requestType, setRequestType] = useState('additional');
  const [quantity, setQuantity] = useState(1);
  const [userName, setUserName] = useState(username); // Assuming userName is retrieved from the user's session or context
  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleRequestTypeChange = (e: SelectChangeEvent<string>) => {
    setRequestType(e.target.value);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming token is stored in LocalStorage
    if (!token) {
      console.error('Missing token');
      return; // Handle missing token error
    }

    try {
      const response = await fetch('http://localhost:3000/wsreq/deptreq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include authorization header with token
        },
        body: JSON.stringify({
          ws_req_name: userName, // Include user name
          message: message,
          dept_fk: deptFk, // Replace with the actual department name or retrieve it from context/session
          ws_req_stat: 'waiting', // Set the initial status to 'Pending'
          ws_req_type: requestType === 'Additional' ? 'additional' : 'replacement', // Map the requestType value to the expected format
          quantity: quantity,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error creating request:', data);
        // Handle errors (e.g., display error message to user)
        return;
      }

      console.log('Request created successfully:', data);
      // Handle successful request creation (e.g., display confirmation message)
    } catch (error) {
      console.error('Error creating request:', error);
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        flexGrow: 1, // Allow component to grow and fill remaining space
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        height: '100vh',
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
        sx={{ width: '100%', marginBottom: 2}}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography sx={{ marginRight: 2 }}>Request Type:</Typography>
        <Select
          value={requestType}
          onChange={handleRequestTypeChange}
          sx={{ minWidth: 120 }}
          required 
        >
          <MenuItem value="additional">Additional</MenuItem>
          <MenuItem value="replacement">Replacement</MenuItem>
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