import { Navigate, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingData from '../../components/ui/Loading/Loading';

const Admin = lazy(() => import('./Admin'));
const Submission = lazy(() => import('./submission/AdminSubmission'));
const UserKYC = lazy(() => import('../user/kyc/UserKYC'));
const UserProfile = lazy(() => import('../user/profile/Profile'));
const PersonalInformation = lazy(() => import('../user/personal-information/PersonalInformation'));

const adminRoutes: RouteObject[] = [
    {
        path: 'admin',
        element: (
            <Suspense fallback={<LoadingData />}>
                <Admin />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="submissions" replace />
            },
            {
                path: ':id/pi',
                element: <PersonalInformation disable />
            },
            {
                path: ':id/kyc',
                element: <UserKYC disable />
            },
            {
                path: ':id/profile',
                element: <UserProfile />
            },
            {
                path: 'submissions',
                element: <Submission />
            }
        ]
    }
];

export default adminRoutes;
