import React, { useState, useEffect } from 'react';
import { Grid, Box, Link, Typography } from '@mui/material';
import DeptCard from '../../components/dept-card';
import DeptReqCard from '../../components/deptreq-card';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

interface Department {
  imageUrl: string;
  departmentName: string;
}

interface DeptRequest {
  // Replace with the actual properties of your department request data
  requestId: number;
  requestType: string;
  quantity: number;
  requestDetails: string;
  requestStatus: string; // e.g., "waiting", "approved", "rejected"
}

const DeptDashboard = () => {
  const [departments, setDepartments] = useState<Department[]>([]); // State for department data
  const [deptRequests, setDeptRequests] = useState<DeptRequest[] | null>(null); // State for department requests (with type)
  const [selectedDept, setSelectedDept] = useState<Department | null>(null); // State for selected department
  const navigate = useNavigate(); // Hook for navigation

  // Fetch department data (replace with your actual API call)
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments'); // Assuming separate endpoint for departments
        const data = await response.json();
        if (response.ok) {
          setDepartments(data);
        } else {
          console.error('Error fetching departments:', data);
          // Handle errors appropriately (e.g., display an error message)
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
        // Handle errors appropriately (e.g., display an error message)
      }
    };

    const fetchDeptRequests = async () => {
      try {
        const response = await fetch('/api/dept-requests'); // Replace with your actual API endpoint
        const data = await response.json();
        if (response.ok) {
          setDeptRequests(data);
        } else {
          console.error('Error fetching department requests:', data);
          // Handle errors appropriately (e.g., display an error message)
        }
      } catch (error) {
        console.error('Error fetching department requests:', error);
        // Handle errors appropriately (e.g., display an error message)
      }
    };

    fetchDepartments();
    fetchDeptRequests();
  }, []);

  const handleDeptClick = (department: Department) => {
    setSelectedDept(department);
    navigate(`/dept-profile/${department.departmentName}`); // Navigate to dept-profile page with department name
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center">
          {departments.length === 0 ? (
            <Typography variant="body1" gutterBottom>
              There are no departments available at this time.
            </Typography>
          ) : (
            departments.map((department, index) => (
              <Box key={index} m={1}>
                <Link
                  component="button"
                  underline="none" // Remove link underline for a button-like appearance
                  onClick={() => handleDeptClick(department)}
                >
                  <DeptCard imageUrl={department.imageUrl} departmentName={department.departmentName} />
                </Link>
              </Box>
            ))
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" flexDirection="column">
          {selectedDept ? (
            <Typography variant="h6" gutterBottom>
              Selected Department: {selectedDept.departmentName}
            </Typography>
          ) : (
            <Typography variant="body1">Please select a department.</Typography>
          )}
          {deptRequests === null ? ( // Handle initial loading state
            <Typography variant="body1" gutterBottom>
              Loading department requests...
            </Typography>
          ) : deptRequests?.length === 0 ? (
            <Typography variant="body1" gutterBottom>
              There are no department requests at this time.
            </Typography>
          ) : (
            <Box>
              {deptRequests.map((request, index) => (
                <Box key={index} m={1}>
                  <DeptReqCard
                    collegeName={request.requestDetails} // Assuming collegeName exists in requestData
                    requestType={request.requestType} // Assuming requestType exists in requestData
                    quantity={request.quantity} // Assuming quantity exists in requestData
                    status={request.requestStatus} // Assuming status exists in requestData
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DeptDashboard;
