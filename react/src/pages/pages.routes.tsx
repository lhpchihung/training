import HomeComponent from "./home/Home";
import userRoutes from "./user/user.routes";
import Pages from "./pages";
import adminRoutes from "./admin/admin.routes";
import { Navigate } from "react-router-dom";
import errorRoutes from "./error/error.routes";


const pageRoutes = [
    {
        path: 'pages',
        element: <Pages />,
        children: [
            {
                path: 'home',
                element: <HomeComponent />
            },
            ...userRoutes,
            ...adminRoutes,
            ...errorRoutes,
            {
                path: '*',
                element: <Navigate to="error/not-found" replace />,
            },
        ]
    },

]

export default pageRoutes;