import { Link } from 'react-router-dom';

const NoProfile = () => (
    <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
            No profile data available. Please create your profile.
        </h3>
        <div className="col-span-12 sm:col-full">
            <Link
                to="pi"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Create
            </Link>
        </div>
    </div>
);

export default NoProfile;
