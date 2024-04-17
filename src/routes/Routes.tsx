import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dept from "../pages/dept";
import Admin from "../pages/admin";
import ProtectedRoute from "../utils/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/dept", element: <ProtectedRoute allowedRoles={['staff']}><Dept /></ProtectedRoute> }, // Allow Staff role
      { path: "/admin", element: <ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute> }, // Allow Admin role
    ]
  }
]);