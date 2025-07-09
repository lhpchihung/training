import Forbidden from './Forbidden';
import NotFound from './NotFound';
import CommonError from './CommonError';
import ErrorPage from './Error';

const errorRoutes = [
    {
        path: 'error',
        element: <ErrorPage />,
        children: [
            {
                path: 'forbidden',
                element: <Forbidden />
            },
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: '*',
                element: <CommonError />
            }
        ]
    }
];

export default errorRoutes;
