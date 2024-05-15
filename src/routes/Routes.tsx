import React from 'react';
import { createBrowserRouter, useParams } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Dept from '../pages/dept';
import Admin from '../pages/admin';
import Register from '../pages/register_contactform';
import Welcome from '../pages/welcome';
import MaintainApplicants from '../pages/maintain-applicants';
import DeptAnnounce from '../pages/dept-announce';
import DeptReq from '../pages/deptreq';
import ProtectedRoute from '../utils/ProtectedRoute';
import WsAnnounce from '../pages/ws-announce';
import UserProfile from '../pages/user-profile';
import RequestWorkingScholar from '../components/requestworkingscholar';
import MaintainWS from '../pages/maintain-ws';
import DeptDashboard from '../pages/maintain-dept';
import DeptProfile from '../pages/dept-profile';
import AdminDashboard from '../pages/admin-dashboard';
import WorkingScholarPage from '../pages/assign-ws';
import { UserType } from '../utils/interfaces';

interface UserProfileWrapperProps {
    userdetailFk: number;
    token: string;
  }

const UserProfileWrapper: React.FC<UserProfileWrapperProps>  = () => {
    const { userId, token } = useParams<{ userId: string; token?: string }>();
    const userIdNumber = userId ? parseInt(userId) : 0; // Default to 0 if userId is undefined
    const tokenValue = token || ''; // Use an empty string if token is undefined

  return (
    <ProtectedRoute allowedRoles={['ws']}>
      <UserProfile userdetailFk={userIdNumber} token={tokenValue} />
    </ProtectedRoute>
  );
};

export const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/dept',
        element: (
          <ProtectedRoute allowedRoles={['staff']}>
            <Dept />
          </ProtectedRoute>
        ),
      },
      { path: '/register', element: <Register /> },
      {
        path: '/maintain-applicants',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <MaintainApplicants />
          </ProtectedRoute>
        ),
      },
      { path: '/welcome', element: <Welcome /> },
      {
        path: '/dept-announce',
        element: (
          <ProtectedRoute allowedRoles={['staff', 'admin']}>
            <DeptAnnounce />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ws-announce',
        element: (
          <ProtectedRoute allowedRoles={['ws']}>
            <WsAnnounce />
          </ProtectedRoute>
        ),
      },
      {
        path: '/deptreq',
        element: (
          <ProtectedRoute allowedRoles={['staff']}>
            <DeptReq />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ws-list',
        element: (
          <ProtectedRoute allowedRoles={['ws']}>
            <WsAnnounce />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile/:userId/:token',
        element: <UserProfileWrapper userdetailFk={0} token={''} />,
      },
      {
        path: '/reqws',
        element: (
          <ProtectedRoute allowedRoles={['staff']}>
            <RequestWorkingScholar />
          </ProtectedRoute>
        ),
      },
      {
        path: '/maintain-ws',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <MaintainWS />
          </ProtectedRoute>
        ),
      },
      {
        path: '/maintain-dept',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <DeptDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dept-profile',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <DeptProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/assignws',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <WorkingScholarPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/maintain-applicants',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <MaintainApplicants />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);