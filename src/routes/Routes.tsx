import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Dept from "../pages/dept";
import Signup from "../pages/signup";
import Admin from "../pages/admin";
// import ProtectedRoute from "../utils/ProtectedRoute";
import Register from "../pages/register_contactform";
import Welcome from "../pages/welcome";
import MaintainWS from "../pages/maintainWS";
import DeptAnnounce from "../pages/dept-announce";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <Login />},
            {path: "/signup", element: <Signup />},
            {path: "/dept", element: <Dept />},
            {path: "/register", element: <Register />},
            {path: "/maintainWS", element: <MaintainWS />},
            {path: "/welcome", element: <Welcome />},
            {path: "/dept-announce", element: <DeptAnnounce />},
        ]
    }
])