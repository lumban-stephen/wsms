import { Paper } from '@mui/material';
import React, { useState } from 'react';
import CreatePostModal from './create-post-modal';

interface DeptAnnounceBoxInputProps {
  onAnnouncementCreate: (announcement: { title: string; message: string }) => void;
}

const DeptAnnounceBoxInput: React.FC<DeptAnnounceBoxInputProps> = ({ onAnnouncementCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '80px',
          marginTop: '20px', // Adjust this value to add the desired space
          cursor: 'pointer',
          padding: '12px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          transition: 'border-color 0.3s ease',
          '&:hover': {
            borderColor: '#999',
          },
        }}
        onClick={handleOpenModal}
      >
        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          {/* Your fake input box */}
          Write an announcement here
        </div>
      </Paper>
      <CreatePostModal open={isModalOpen} onClose={handleCloseModal} onAnnouncementCreate={onAnnouncementCreate} />
    </>
  );
};

export default DeptAnnounceBoxInput;
