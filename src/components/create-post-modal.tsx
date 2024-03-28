import { Modal, Paper } from '@mui/material';
import React from 'react';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px' }}>
        <Paper sx={{ padding: '20px' }}>
          {children}
        </Paper>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
