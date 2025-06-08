import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticatedContext, UserRole } from "../../shared/Authenticated";


const Admin = () => {
    const { user } = useContext(AuthenticatedContext);

    return user?.role === UserRole.Admin ? <Outlet /> : <Navigate to="/pages/error/forbidden" replace />;
};

export default Admin;