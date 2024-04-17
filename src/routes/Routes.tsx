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
import MaintainWS from "../pages/maintainWS/OrigIndex";
import DeptAnnounce from "../pages/dept-announce";
import DeptReq from "../pages/deptreq";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <Login />},
            {path: "/signup", element: <Signup />},
            {path: "/dept", element: <ProtectedRoute allowedRoles={['staff']}><Dept /></ProtectedRoute> }, // Allow Staff role
            {path: "/register", element: <Register />},
            {path: "/maintainWS", element: <MaintainWS />},
            {path: "/welcome", element: <Welcome />},
            {path: "/dept-announce", element: <DeptAnnounce />},
            {path: "/deptreq", element: <DeptReq />},
            {path: "/admin", element: <ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute> }, // Allow Admin role
        ]
    }
])

