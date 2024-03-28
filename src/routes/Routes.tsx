import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Age from "../pages/Age";
import Food from "../pages/Food";
import ProtectedRoute from "../utils/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <Login />},
            {path: "/register", element: <Register />},
            {path: "/age", 
                element:(
                    <ProtectedRoute>
                        <Age />
                    </ProtectedRoute>) },
            {path: "/food", 
                element: (
                    <ProtectedRoute>
                        <Food />
                    </ProtectedRoute>
                )},
        ]
    }
])