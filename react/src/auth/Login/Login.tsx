import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import PrimaryButton from '../../components/ui/Button/PrimaryButton';
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils';

import { LoginData } from './Login.types';
import { UserRole } from '../../types/user';

import { AuthenticatedContext } from '../../shared/Authenticated';

import { loginUser } from '../../services/dummy-api';
import mockUsersData from '../../services/mockUsers.json';
import config from '../../config/config.json';
import { User } from '../../pages/user/personal-information/model';
import { isUserExist, saveUserToServer } from '../../services/user-api';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue
    } = useForm<LoginData>();

    const [loading, setLoading] = useState<boolean>(false);
    const isAuthenticated = useContext(AuthenticatedContext);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setValue('email', savedEmail);
            setValue('remember', true);
        }
    }, [setValue]);

    const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
        setLoading(true);
        try {
            const { defaultUsername, defaultPassword } = config;
            const response = await loginUser(defaultUsername, defaultPassword);
            sessionStorage.setItem('accessToken', response.accessToken);

            const matchedUser =
                data.email === mockUsersData.admin.email &&
                data.password === mockUsersData.admin.password
                    ? mockUsersData.admin
                    : data.email === mockUsersData.user.email &&
                      data.password === mockUsersData.user.password
                    ? mockUsersData.user
                    : null;

            if (!matchedUser) {
                setError('password', {
                    type: 'manual',
                    message: 'Invalid email or password'
                });
                setLoading(false);
                return;
            }

            const user: User = {
                id: matchedUser.id,
                name: matchedUser.name,
                email: matchedUser.email,
                role: matchedUser.role as UserRole,
                profile: null
            };

            sessionStorage.setItem('user', JSON.stringify(user));
            isAuthenticated.setUser(user);
            isAuthenticated.setUserWithRemember(user, data.remember);

            if (!(await isUserExist(user.email))) {
                await saveUserToServer(user);
            }

            showSuccessToast('Login successfully!');

            if (user.role === UserRole.Admin) {
                navigate('/pages/admin');
            } else {
                navigate(`/pages/user/${user.id}/profile`);
            }
        } catch (error) {
            showErrorToast('Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
            <a
                href="#"
                className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
            >
                <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
                <span>Simple KYC Authentication</span>
            </a>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@company.com"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            {...register('password', {
                                required: 'Password is required'
                            })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                {...register('remember')}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="remember"
                                className="font-medium text-gray-900 dark:text-white"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/auth/reset-password"
                            className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Lost Password?
                        </Link>
                    </div>
                    <PrimaryButton
                        title="Login to your account"
                        loading={loading}
                        onClick={handleSubmit(onSubmit)}
                    />
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Forgot password?{' '}
                        <Link
                            to="/auth/sign-up"
                            className="text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Sign-up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
