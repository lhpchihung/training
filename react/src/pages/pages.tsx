import Header from '../components/layout/Header/Header';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import { Navigate, Outlet, useLocation } from 'react-router';
import Footer from '../components/layout/Footer/Footer';
import React, { ReactNode, useContext } from 'react';
import { UserRole, AuthenticatedContext } from '../shared/Authenticated';

const redirectToRolePage = (userRole: UserRole) => {
    if (userRole === UserRole.Admin) return '/pages/admin';
    if (userRole === UserRole.User) return '/pages/user';
    return null;
};

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <>
        <Header />
        <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div
                id="main-content"
                className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
            >
                <main>
                    {children}
                    <Footer />
                </main>
            </div>
        </div>
    </>
);

const Pages = () => {
    const isAuthenticated = useContext(AuthenticatedContext);
    const location = useLocation();

    if (!isAuthenticated?.user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (location.pathname === '/pages') {
        const redirectPath = redirectToRolePage(isAuthenticated.user.role);
        if (redirectPath) {
            return <Navigate to={redirectPath} replace />;
        }
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default Pages;
