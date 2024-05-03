import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const AddDepartmentModal = ({ open, onClose }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentAdmin, setDepartmentAdmin] = useState('');
  const [workingScholars, setWorkingScholars] = useState([]);
  const [deptContact, setDeptContact] = useState('');
  const [deptEmail, setDeptEmail] = useState('');

  const handleAddWorkingScholar = () => {
    setWorkingScholars([...workingScholars, '']);
  };

  const handleRemoveWorkingScholar = (index) => {
    const newScholars = [...workingScholars];
    newScholars.splice(index, 1);
    setWorkingScholars(newScholars);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      departmentName,
      departmentAdmin,
      workingScholars,
      deptContact,
      deptEmail,
    });
    // Reset form fields or close the modal
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Department</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="department-admin-label">Department Admin</InputLabel>
            <Select
              labelId="department-admin-label"
              value={departmentAdmin}
              onChange={(e) => setDepartmentAdmin(e.target.value)}
            >
              {/* Add options for department admins */}
            </Select>
          </FormControl>
          {workingScholars.map((scholar, index) => (
            <FormControl key={index} fullWidth margin="normal">
              <InputLabel>Add a Working Scholar:</InputLabel>
              <Select
                value={scholar}
                onChange={(e) => {
                  const newScholars = [...workingScholars];
                  newScholars[index] = e.target.value;
                  setWorkingScholars(newScholars);
                }}
              >
                <MenuItem value="">
                  <em>(You may do this later)</em>
                </MenuItem>
                {/* Add options for working scholars */}
              </Select>
              {index === workingScholars.length - 1 && (
                <Button onClick={handleAddWorkingScholar}>Add</Button>
              )}
              {workingScholars.length > 1 && (
                <Button onClick={() => handleRemoveWorkingScholar(index)}>
                  Remove
                </Button>
              )}
            </FormControl>
          ))}
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
          <Button type="submit" color="primary">
            Add Dept
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDepartmentModal;