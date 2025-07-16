import authRoutes from './auth/auth.routes';
import pagesRoutes from './pages/pages.routes';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const appRouter = createBrowserRouter([
    {
        path: '',
        element: <Navigate to="/pages" replace />
    },
    ...pagesRoutes,
    ...authRoutes,
    {
        path: '*',
        element: <Navigate to="/pages/error/not-found" replace />
    }
]);

export default appRouter;
