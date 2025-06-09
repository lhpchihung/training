import { RouteObject } from "react-router";
import Login from "./Login/Login";
import ResetPassword from "./ResetPassword/ResetPassword";
import Auth from "./Auth";
import SignUp from "./SignUp/SignUp";
import Logout from "./Logout/logout";

const authRoutes: RouteObject[] = [
    {
        path: 'auth',
        element: <Auth />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            },
            {
                path: 'logout',
                element: <Logout />
            },
        ]

    }
]

export default authRoutes;