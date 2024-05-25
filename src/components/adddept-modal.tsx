import React, { useState, useEffect } from 'react';
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

type User = {
  userId: number;
  username: string;
};

type Department = {
  department_id: number;
  imageUrl: string;
  department_name: string;
  userType: string;
  contact: string;
  deptEmail: string;
  departmentAdminUserId: number; // Updated to use the userId instead of username
};

type AddDepartmentModalProps = {
  open: boolean;
  onClose: () => void;
  onDepartmentAdded: (department: Department) => void;
};

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ open, onClose, onDepartmentAdded }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [userType, setUserType] = useState('');
  const [contact, setContact] = useState('');
  const [deptEmail, setDeptEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [departmentAdminUserId, setDepartmentAdminUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const users = await response.json();
          setUsers(users);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDepartment: Department = {
      department_name: departmentName,
      contact,
      deptEmail,
      userType,
      departmentAdminUserId: departmentAdminUserId || 0, // Set a default value if departmentAdminUserId is null
      imageUrl: '', // Assuming you have a default image URL or will handle it on the backend
      department_id: 0, // This will be assigned by the backend
    };

    try {
      const response = await fetch('http://localhost:3000/departments/adddept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment),
      });

      if (response.ok) {
        const data = await response.json();
        onDepartmentAdded(data);
      } else {
        console.error('Failed to add department');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset form fields
    setDepartmentName('');
    setUserType('');
    setContact('');
    setDeptEmail('');
    setDepartmentAdminUserId(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Department</DialogTitle>
      <form onSubmit={handleAdd}>
        <DialogContent>
          <TextField
            label="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-type-label">Department Admin</InputLabel>
            <Select
              labelId="user-type-label"
              value={departmentAdminUserId || ''}
              onChange={(e) => setDepartmentAdminUserId(Number(e.target.value) || null)}
            >
              <MenuItem value="">Select Department Admin</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department Email"
            value={deptEmail}
            onChange={(e) => setDeptEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add Department
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDepartmentModal;