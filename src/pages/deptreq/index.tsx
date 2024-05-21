import React, { useEffect, useState } from 'react';
import PendingRequestList from '../../components/pendingrequestlist';
import RequestDetails from '../../components/requestdetails';
import RequestWorkingScholar from '../../components/requestworkingscholar';
import { Typography } from '@mui/material';
import NavBarStaff from '../../components/navbar-staff';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../utils/user';

interface Request {
  ws_req_id: string;
  ws_req_name: string;
  message: string;
  dept_name_fk: string;
  ws_req_stat: string;
  ws_req_type: string;
  quantity: number;
  date_created: string;
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

const DeptReq: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [userDept, setUserDept] = useState<number>(); // Store user's department
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Retrieve department from token data (modify based on your token structure)
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<User>(storedToken);
        setUsername(decodedToken.username);
        setUserDept(decodedToken.dept_fk);
        if(!userDept) {
          console.log("dept didn't go through")
        }else{
          console.log(userDept)
        }
    } catch (error) {
        console.error('Error decoding token:', error);
    }
    }
  }, []);

  const fetchData = async () => {
    if (!userDept) return; // Don't fetch if department is not available

    try {
      const response = await fetch(`/api/pending-requests?dept=${userDept}`); // Add query parameter for department
      const data = await response.json();
      if (response.ok) {
        setRequests(data);
      } else {
        console.error('Error fetching requests:', data);
        // Handle errors appropriately
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Handle errors appropriately
    }
  };

  useEffect(() => {
    fetchData();
  }, [userDept]);

  const handleViewClick = (
    ws_req_id: string,
    ws_req_name: string,
    message: string,
    dept_name_fk: string,
    ws_req_stat: string,
    ws_req_type: string,
    quantity: number,
    date_created: string
  ) => {
    setShowRequestDetails(true);
    setSelectedRequest({
      ws_req_id,
      ws_req_name,
      message,
      dept_name_fk,
      ws_req_stat,
      ws_req_type,
      quantity,
      date_created,
    });
  };

  return (
    <>
    <NavBarStaff activeTab={'Departments'}  />
      <div style={{ display: 'flex' }}>
        <PendingRequestList
          requests={requests} // Pass fetched requests as props
          onViewClick={handleViewClick}
        />
        <div style={{ width: '75vw', padding: 2 }}>
          {userDept ? ( // Check if user department is available
            showRequestDetails && selectedRequest ? (
              selectedRequest.ws_req_stat === 'Pending' ? ( // Check the status
                <RequestWorkingScholar />
              ) : (
                <RequestDetails
                  requestId={selectedRequest.ws_req_id}
                  requestType={selectedRequest.ws_req_type}
                  quantity={selectedRequest.quantity}
                  message={selectedRequest.message}
                />
              )
            ) : (
              <RequestWorkingScholar /> // Default case: show RequestWorkingScholar initially
            )
          ) : (
            <Typography variant="body1">You are not assigned to a department.</Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default DeptReq;