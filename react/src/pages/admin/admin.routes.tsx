import { Navigate, RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingData from "../../components/ui/Loading/Loading";

const Submission = lazy(() => import("./kyc/AdminKYC"));
const UserKYC = lazy(() => import("../user/kyc/UserKYC"));
const Admin = lazy(() => import("./Admin"));
const PersonalInformation = lazy(() => import("../user/personal-information/PersonalInformation"));

const adminRoutes: RouteObject[] = [
    {
        path: "admin",
        element: (
            <Suspense fallback={<LoadingData />}>
                <Admin />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="submissions" replace />,
            },
            {
                path: ":id/pi",
                element: <PersonalInformation disable />,
            },
            {
                path: ":id/kyc",
                element: <UserKYC disable />,
            },
            {
                path: "submissions",
                element: <Submission />,
            },
        ],
    },
];

export default adminRoutes;
