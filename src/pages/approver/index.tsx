import React, { useState, useEffect } from 'react';
import { Grid, Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeptCard from '../../components/dept-card';
import DeptReqCard from '../../components/deptreq-card';
import ApproveReq from '../../components/approve-req';
import AddDeptIcon from '../../components/adddept-icon';
import AddDepartmentModal from '../../components/adddept-modal';
import NavBarAdmin from '../../components/navbar-admin';
import imageUrl from '../../assets/uclm-banner.jpg';
import AdminPending from '../../components/adminpending';

type Department = {
  department_id: number;
  imageUrl: string;
  department_name: string;
  userType: string;
  contact: string;
  deptEmail: string;
};

interface DeptRequest {
  requestId: number;
  requestType: string;
  quantity: number;
  requestDetails: string;
  requestStatus: string;
}

interface Request {
  ws_req_id: number;
  ws_req_name: string;
  message: string;
  dept_name_fk: number;
  ws_req_stat: string;
  ws_req_type: string;
  quantity: number;
  date_created: string;
  ws_req_approved_step?: number;
}

interface PendingRequestListProps {
  requests: Request[];
  onViewClick: (
    requestId: string,
    requestType: string,
    quantity: number,
    status: string,
    message: string
  ) => void;
}

const Approver: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  // const [departments, setAllDepartments] = useState([]);
  const [deptRequests, setDeptRequests] = useState<Request[] | null>(null);
  const [selectedDeptRequest, setSelectedDeptRequest] = useState<Request | null>(null);
  const [isDeptReqModalOpen, setIsDeptReqModalOpen] = useState(false);
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);
  const navigate = useNavigate();
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const fetchAllDepartments = async () => {
    try {
      const response = await fetch('http://localhost:3000/departments/adddept');
      const data = await response.json();
      if (response.ok) {
        setDepartments((prevDepartments) => [...prevDepartments, ...data]);
      } else {
        console.error('Error fetching all departments:', data);
      }
    } catch (error) {
      console.error('Error fetching all departments:', error);
    }
  };

  const handleDeptClick = (department: Department) => {
    navigate(`/dept-profile/${department.department_id}`);
  };

  const handleOpenAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(true);
  };

  const handleCloseAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(false);
  };

  const handleOpenDeptReqModal = (request: Request) => {
    setSelectedDeptRequest(request);
    setIsDeptReqModalOpen(true);
  };

  const handleCloseDeptReqModal = () => {
    setIsDeptReqModalOpen(false);
    setSelectedDeptRequest(null);
  };

  const handleViewClick = (
    request : Request
  ) => {
    setShowRequestDetails(true);
    setSelectedDeptRequest(request);
  };
  
  const handleApprove = async () => {
    if (!selectedDeptRequest) return;
    if(!selectedDeptRequest.ws_req_approved_step) {
      setCurrentStep(0);
    }

    setCurrentStep(selectedDeptRequest?.ws_req_approved_step ?? 0); // Set 0 as default if undefined
    

    const confirmationMessage = `Are you sure you want to approve this request? This will move it to step ${currentStep + 1}.`;
  
    const confirmationDialog = window.confirm(confirmationMessage); // Using window.confirm for simplicity
  
    if (confirmationDialog) {
      try {
        const updatedRequest = {
          ...selectedDeptRequest,
          ws_req_approved_step: Math.min(currentStep + 1, 4), // Limit to 4 steps (assuming final step is 4)
        };
  
        const response = await fetch(`http://localhost:3000/requests/dept-requests/${selectedDeptRequest.ws_req_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedRequest),
        });
  
        if (response.ok) {
          console.log('Request approved successfully');
          setSelectedDeptRequest(updatedRequest); // Update state with incremented step
          
          // Check if final step reached
          if (updatedRequest.ws_req_approved_step === 4) {
            navigate('/new-page'); // Replace '/new-page' with your desired new page
          } else {
            // Show success message or refresh request details (optional)
          }
        } else {
          console.error('Error approving request:', await response.text());
        }
      } catch (error) {
        console.error('Error approving request:', error);
      }
    }
  };

  const handleReject = async () => {
    if (!selectedDeptRequest) return;

    try {
      const response = await fetch(`/api/dept-requests/${selectedDeptRequest.ws_req_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ws_req_stat: 'rejected' }),
      });

      if (response.ok) {
        console.log('Request rejected successfully');
        navigate('/maintain-dept');
      } else {
        console.error('Error rejecting request:', await response.text());
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleDepartmentAdded = (addedDepartment: Department) => {
    setDepartments((prevDepartments) => [...prevDepartments, addedDepartment]);
    setIsAddDepartmentModalOpen(false);
  };



  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/requests/fetchrequests'); // Assuming backend endpoint
        const data = await response.json();
        console.log("request data is " + response);
        if (response.ok) {
          setDeptRequests(data);
        } else {
          console.error('Error fetching requests:', data);
        }
      } catch (error) {
        console.error('Error fetching requests here:', error);
      }
    };
    fetchAllRequests();
    }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3000/departments/alldept'); // Assuming separate endpoint for departments
        const data = await response.json();
        if (response.ok) {
          setDepartments(data);
          console.log(data)
        } else {
          console.error('Error fetching departments:', data);
          // Handle errors appropriately (e.g., display an error message)
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
        // Handle errors appropriately (e.g., display an error message)
      }
    };
    fetchAllDepartments();
    fetchDepartments();
    handleApprove();
  }, []);

  return (
    <>
      <NavBarAdmin activeTab={'Departments'} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" mb={2}>
              {departments.length === 0 ? (
                <Typography variant="body1" gutterBottom>
                  There are no departments available at this time.
                </Typography>
              ) : (
                departments.map((department, index) => (
                  <Box key={index} m={1}>
                    <Link component="button" underline="none" onClick={() => handleDeptClick(department)}>
                      <DeptCard
                        imageUrl={imageUrl}
                        departmentId={department.department_id}
                        departmentName={department.department_name}
                        userType={department.userType}
                        deptContact={department.contact}
                        deptEmail={department.deptEmail}
                      />
                    </Link>
                  </Box>
                ))
              )}
            </Box>
            <AddDeptIcon onClick={handleOpenAddDepartmentModal} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <AdminPending requests={deptRequests || []} onViewClick={handleViewClick} />
        </Grid>
      </Grid>
      <AddDepartmentModal
        open={isAddDepartmentModalOpen}
        onClose={handleCloseAddDepartmentModal}
        onDepartmentAdded={handleDepartmentAdded}
      />
    </>
  );
};

export default Approver;
