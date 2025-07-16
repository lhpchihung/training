import { Navigate, RouteObject } from 'react-router';
import { lazy, Suspense } from 'react';
import LoadingData from '../../components/ui/Loading/Loading';
import UserSubmission from './submission/Submission';
import CreateSubmissionForm from './submission/components/CreateSubmissionForm';

const PersonalInformation = lazy(() => import('./personal-information/PersonalInformation'));
const UserKYC = lazy(() => import('./kyc/UserKYC'));
const User = lazy(() => import('./user'));
const UserProfile = lazy(() => import('./profile/Profile'));

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: (
            <Suspense fallback={<LoadingData />}>
                <User />
            </Suspense>
        ),
        children: [
            {
                path: ':id/pi',
                element: <PersonalInformation disable={false} />
            },
            {
                path: ':id/kyc',
                element: <UserKYC disable={false} />
            },
            {
                path: ':id/profile',
                element: <UserProfile />
            },
            {
                path: ':id/submissions',
                element: <UserSubmission />
            },
            {
                path: ':id/submissions/create',
                element: <CreateSubmissionForm />
            }
        ]
    }
];

export default userRoutes;
