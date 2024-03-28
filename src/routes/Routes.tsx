import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Dept from "../pages/dept";
import Register from "../pages/signup";
import Admin from "../pages/admin";
import ProtectedRoute from "../utils/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <Login />},
            {path: "/register", element: <Register />},
            {path: "/dept", 
                element:(
                    <ProtectedRoute>
                        <Dept />
                    </ProtectedRoute>) },
            {path: "/admin", 
                element: (
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                )},
        ]
    }
])