import React, { useState, useEffect } from 'react';
import { Grid, Box, Link, Typography } from '@mui/material';
import DeptCard from '../../components/dept-card';
import DeptReqCard from '../../components/deptreq-card';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ApproveReq from '../../components/approve-req'; // Assuming ApproveReq is in the same directory
import AddDeptIcon from '../../components/adddept-icon';
import AddDepartmentModal from '../../components/adddept-modal';
import NavBarAdmin from '../../components/navbar-admin';

interface Department {
  imageUrl: string;
  departmentName: string;
}

interface DeptRequest {
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
  const [isDeptReqModalOpen, setIsDeptReqModalOpen] = useState(false); // State for modal visibility
  const [selectedDeptRequest, setSelectedDeptRequest] = useState<DeptRequest | null>(null); // State for selected request data
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);

  const handleOpenAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(true);
  };
  
  const handleCloseAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(false);
  };

  const handleCloseDeptReqModal = () => {
    setIsDeptReqModalOpen(false);
    setSelectedDeptRequest(null); // Clear selected request on close (optional)
  };
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

  const handleOpenDeptReqModal = (request: DeptRequest) => {
    setSelectedDeptRequest(request);
    setIsDeptReqModalOpen(true);
  };

  const handleApprove = async () => {
    // Implement API call to update request status
    try {
      const response = await fetch(`/api/dept-requests/${selectedDeptRequest?.requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ws_req_stat: 'approved' }), // Update request status
      });
  
      if (response.ok) {
        console.log('Request approved successfully');
        navigate('/maintain-dept');
        // Update local state (optional) to reflect changes
      } else {
        console.error('Error approving request:', await response.text());
        // Handle errors appropriately (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error approving request:', error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  const handleReject = async () => {
    // Implement API call to update request status
    try {
      const response = await fetch(`/api/dept-requests/${selectedDeptRequest?.requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ws_req_stat: 'rejected' }), // Update request status
      });
  
      if (response.ok) {
        console.log('Request rejected successfully');
        navigate('/maintain-dept');
        // Update local state (optional) to reflect changes
      } else {
        console.error('Error rejecting request:', await response.text());
        // Handle errors appropriately (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };


  return (
    <>
    <NavBarAdmin activeTab={'Applicants'}/>
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
          {deptRequests === null ? (
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
                    onClick={() => handleOpenDeptReqModal(request)} // Add click handler for modal
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Grid>
      {/* Render ApproveReq modal conditionally */}
      {isDeptReqModalOpen && selectedDeptRequest && (
        <ApproveReq
          open={isDeptReqModalOpen}
          onClose={handleCloseDeptReqModal}
          requestDetails={selectedDeptRequest}
        />
      )}
      <AddDeptIcon onClick={handleOpenAddDepartmentModal} />
    </Grid>
    <AddDepartmentModal
    open={isAddDepartmentModalOpen}
    onClose={handleCloseAddDepartmentModal}
    // Pass any additional props required by AddDepartmentModal
  />
  </>
  );
};

export default DeptDashboard;
