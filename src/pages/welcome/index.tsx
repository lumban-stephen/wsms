import React, { useState } from 'react';
import { Typography } from '@mui/material';
import LoginImage from '../../assets/uclm-banner.jpg';
import { registerUser } from '../../db/prisma';
import NavBarWS from '../../components/navbar-ws';

const Welcome: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const user = await registerUser(username, password);
      console.log("Successful registration")
    } catch(error) {
      console.error("cannot register.")
    }
  };

  return (
      <div> 
        <NavBarWS activeTab={'Home'} />
        <img src={LoginImage} alt="Login banner" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
        <Typography variant="h3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          Welcome
        </Typography>
      </div>
  );
};

export default Welcome;