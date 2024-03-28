import { Modal, Paper, TextField, Button, Box } from '@mui/material';
import React from 'react';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onClose }) => {
  const handleCreatePost = () => {
    // Add logic for creating the announcement
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '800px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px' }}>
        <Paper sx={{ padding: '20px' }}>
          <h1>Create an announcement</h1>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField label="Title" fullWidth />
            <TextField label="Body" fullWidth multiline rows={10} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleCreatePost} sx={{ marginRight: '10px' }}>Submit</Button>
            <Button variant="text" onClick={handleCancel}>Cancel</Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
