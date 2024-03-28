import { Paper, Container } from '@mui/material';
import React, { useState } from 'react';

const DeptAnnounceBoxInput: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  return (
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '80px',
          marginTop: '20px', // Adjust this value to add the desired space
          cursor: 'pointer',
        }}
        onClick={handleOpenModal}
      >
        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          {/* Your fake input box */}
          Click to Open Modal
        </div>
      </Paper>
  );
};

export default DeptAnnounceBoxInput;
