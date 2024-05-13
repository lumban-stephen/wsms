import React from 'react';
import { IconButton, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddDeptIconProps {
  onClick: () => void; // Define the type of the onClick prop
}

const AddDeptIcon = ({ onClick }: AddDeptIconProps) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddDeptIcon;