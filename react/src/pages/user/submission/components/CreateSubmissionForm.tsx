import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtils';
import { useState } from 'react';
import { SubmissionStatus, UserSubmissionAction } from '../../../../types/submission';
import { createSubmission } from '../../../../services/submission-api';
import { UserSubmission } from '../model';

const CreateSubmissionForm = () => {
    const { id: userId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{ name: string }>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (formData: { name: string }) => {
        if (!userId) {
            showErrorToast('User ID not found in URL');
            return;
        }

        const newSubmission: UserSubmission = {
            id: crypto.randomUUID(),
            name: formData.name,
            requestDate: new Date().toISOString().split('T')[0],
            status: SubmissionStatus.Waiting,
            action: UserSubmissionAction.Request,
            userId
        };

        try {
            setLoading(true);
            await createSubmission(newSubmission);
            showSuccessToast('Submission created!');
            navigate(`/pages/user/${userId}/submissions`);
        } catch (error) {
            console.error(error);
            showErrorToast('Create submission failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Create New Submission
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Submission Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Submission name is required' })}
                            className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter submission name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Create Submission'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSubmissionForm;
