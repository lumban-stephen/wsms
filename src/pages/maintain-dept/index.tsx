import React, { useState, useEffect } from 'react';
import { Grid, Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeptCard from '../../components/dept-card';
import DeptReqCard from '../../components/deptreq-card';
import ApproveReq from '../../components/approve-req';
import AddDeptIcon from '../../components/adddept-icon';
import AddDepartmentModal from '../../components/adddept-modal';
import NavBarAdmin from '../../components/navbar-admin';

type Department = {
  departmentId: string;
  imageUrl: string;
  departmentName: string;
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

const DeptDashboard: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [deptRequests, setDeptRequests] = useState<DeptRequest[] | null>(null);
  const [selectedDeptRequest, setSelectedDeptRequest] = useState<DeptRequest | null>(null);
  const [isDeptReqModalOpen, setIsDeptReqModalOpen] = useState(false);
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments-users');
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          console.error('Error fetching departments:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDeptRequests = async () => {
      try {
        const response = await fetch('/api/dept-requests');
        if (response.ok) {
          const data = await response.json();
          setDeptRequests(data);
        } else {
          console.error('Error fetching department requests:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching department requests:', error);
      }
    };

    fetchDeptRequests();
  }, []);

  const handleDeptClick = (department: Department) => {
    navigate(`/dept-profile/${department.departmentId}`);
  };

  const handleOpenAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(true);
  };

  const handleCloseAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(false);
  };

  const handleOpenDeptReqModal = (request: DeptRequest) => {
    setSelectedDeptRequest(request);
    setIsDeptReqModalOpen(true);
  };

  const handleCloseDeptReqModal = () => {
    setIsDeptReqModalOpen(false);
    setSelectedDeptRequest(null);
  };

  const handleApprove = async () => {
    if (!selectedDeptRequest) return;

    try {
      const response = await fetch(`/api/dept-requests/${selectedDeptRequest.requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ws_req_stat: 'approved' }),
      });

      if (response.ok) {
        console.log('Request approved successfully');
        navigate('/maintain-dept');
      } else {
        console.error('Error approving request:', await response.text());
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async () => {
    if (!selectedDeptRequest) return;

    try {
      const response = await fetch(`/api/dept-requests/${selectedDeptRequest.requestId}`, {
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

  return (
    <>
      <NavBarAdmin activeTab={'Departments'} />
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
                    underline="none"
                    onClick={() => handleDeptClick(department)}
                  >
                    <DeptCard
                      imageUrl={department.imageUrl}
                      departmentName={department.departmentName}
                      departmentAdmin={department.userType}
                      deptContact={department.contact}
                      deptEmail={department.deptEmail}
                    />
                  </Link>
                </Box>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
      <AddDeptIcon onClick={handleOpenAddDepartmentModal} />
      <AddDepartmentModal
          open={isAddDepartmentModalOpen}
          onClose={handleCloseAddDepartmentModal}
          onDepartmentAdded={handleDepartmentAdded} // Ensure this matches the global Department type
        />
    </>
  );
};

export default DeptDashboard;
