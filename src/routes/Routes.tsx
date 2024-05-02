import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dept from "../pages/dept";
import Admin from "../pages/admin";
// import ProtectedRoute from "../utils/ProtectedRoute";
import Register from "../pages/register_contactform";
import Welcome from "../pages/welcome";
import MaintainApplicants from "../pages/maintain-applicants";
import DeptAnnounce from "../pages/dept-announce";
import DeptReq from "../pages/deptreq";
import ProtectedRoute from '../utils/ProtectedRoute';
import WsAnnounce from '../pages/ws-announce';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <Login />},
            {path: "/register", element: <Register />},
            {path: "/signup", element: <Signup />},
            {path: "/dept", element: <ProtectedRoute allowedRoles={['staff']}><Dept /></ProtectedRoute> }, // Allow Staff role
            {path: "/register", element: <Register />},
            {path: "/maintain-applicants", element: <ProtectedRoute allowedRoles={['admin']}><MaintainApplicants /></ProtectedRoute>}, //Admin
            {path: "/welcome", element: <Welcome />},
            {path: "/dept-announce", element: <ProtectedRoute allowedRoles={['staff']}><DeptAnnounce /></ProtectedRoute> }, // Allow Staff role
            {path: "/ws-announce", element: <ProtectedRoute allowedRoles={['ws']}><WsAnnounce /></ProtectedRoute> }, // Allow Staff role
            {path: "/deptreq", element: <ProtectedRoute allowedRoles={['staff']}><DeptReq /></ProtectedRoute> }, // Allow Staff role
            {path: "/admin", element: <ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute> }, // Allow Admin role
        ]
    }
])

