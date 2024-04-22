// CreatePostModal.tsx
import { Modal, Paper, TextField, Button, Box, Backdrop } from '@mui/material';
import React, { useState } from 'react';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onAnnouncementCreate: (announcement: { title: string; message: string }) => void; // Function to handle created announcement
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onClose, onAnnouncementCreate }) => {
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });

  const handleCreatePost = () => {
    if (announcement.title.trim() !== '' && announcement.message.trim() !== '') {
      // Call the function to handle the created announcement
      onAnnouncementCreate(announcement);

      // Reset the form and close the modal
      setAnnouncement({ title: '', message: '' });
      onClose();
    } else {
      console.error('Title and body must not be empty');
    }
  };

  const handleCancel = () => {
    // Reset the form when canceling
    setAnnouncement({ title: '', message: '' });

    // Close the modal
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Update the announcement state when input changes
    const { name, value } = event.target;
    setAnnouncement(prevAnnouncement => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose} BackdropComponent={Backdrop} BackdropProps={{ sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
      <Box sx={{ width: '800px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <Paper sx={{ padding: '20px', borderRadius: '8px' }}>
          <h1>Create an announcement</h1>
          <TextField label="Title" fullWidth value={announcement.title} name="title" onChange={handleInputChange} />
          <TextField label="Message" fullWidth multiline rows={10} value={announcement.message} name="message" onChange={handleInputChange} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleCreatePost} sx={{ marginRight: '10px' }}>Submit</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;