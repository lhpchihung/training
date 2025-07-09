import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
            <div className="block mb-5 md:max-w-md">
                <img src="/icons/error-403.svg" alt="maintenance image" className="w-[150px]" />
            </div>
            <div className="text-center xl:max-w-4xl">
                <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    403 - Forbidden
                </h1>
                <p className="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
                    You are not allowed!!!
                    <br />
                    <Link to="/" className="text-primary-700 hover:underline dark:text-primary-500">
                        Back to Homepage
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Forbidden;
