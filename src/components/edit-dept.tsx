import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

interface EditDepartmentModalProps {
  open: boolean;
  onClose: () => void;
  departmentData: {
    departmentName: string;
    departmentAdmin: string;
    deptContact: string;
    deptEmail: string;
  };
  onSave: (updatedData: {
    departmentName: string;
    departmentAdmin: string;
    deptContact: string;
    deptEmail: string;
  }) => void;
}

const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({
  open,
  onClose,
  departmentData,
  onSave,
}) => {
  const [departmentName, setDepartmentName] = React.useState(departmentData.departmentName);
  const [departmentAdmin, setDepartmentAdmin] = React.useState(departmentData.departmentAdmin);
  const [deptContact, setDeptContact] = React.useState(departmentData.deptContact);
  const [deptEmail, setDeptEmail] = React.useState(departmentData.deptEmail);

  const handleSave = () => {
    onSave({
      departmentName,
      departmentAdmin,
      deptContact,
      deptEmail,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Department</DialogTitle>
      <DialogContent>
        <TextField
          label="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Department Admin"
          value={departmentAdmin}
          onChange={(e) => setDepartmentAdmin(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Dept. Contact #"
          value={deptContact}
          onChange={(e) => setDeptContact(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dept. Email"
          value={deptEmail}
          onChange={(e) => setDeptEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Edit Dept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDepartmentModal;