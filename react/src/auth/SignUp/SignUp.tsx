import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils';
import { signUpUser } from '../../services/dummy-api';
import PrimaryButton from '../../components/ui/Button/PrimaryButton';
import { SignUpData } from './SignUp.types';

const SignUp = () => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpData>();

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const termsAccepted: boolean = watch('term', false);

    const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData): Promise<void> => {
        setLoading(true);
        try {
            const user = await signUpUser(data.email, data.password);
            showSuccessToast('Sign up successfully!');
            navigate('/auth/login');
        } catch (error) {
            showErrorToast('Sign up failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
            <a
                href=""
                className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
            >
                <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
                <span>Sign-up for Simple KYC</span>
            </a>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create a Free Account
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
                            defaultValue="hung@example.com"
                            placeholder="hung@example.com"
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
                            defaultValue="Hung@123"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                },
                                pattern: {
                                    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#&!]).{6,}$/,
                                    message:
                                        'Password must contain at least one letter, one digit, and one special character (@, #, &, !).'
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Confirm password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            defaultValue="Hung@123"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value: string) =>
                                    value === watch('password') || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                {...register('term', {
                                    required: 'You must accept the terms and conditions'
                                })}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="remember"
                                className="font-medium text-gray-900 dark:text-white"
                            >
                                I accept the{' '}
                                <a
                                    href="#"
                                    className="text-primary-700 hover:underline dark:text-primary-500"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                    </div>
                    {errors.term && <p className="text-sm text-red-500">{errors.term.message}</p>}
                    <PrimaryButton
                        title="Create account"
                        onClick={handleSubmit(onSubmit)}
                        term={termsAccepted}
                        loading={loading}
                    />
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Already have an account?{' '}
                        <a
                            href="/auth/login"
                            className="text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Login here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
