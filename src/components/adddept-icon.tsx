import React from 'react';
import { IconButton, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddDeptIcon = () => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddDeptIcon;