import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtils';
import { ActiveStatus, SubmissionStatus, UserSubmissionAction } from '../../../../types/submission';
import { UserSubmission } from '../model';
import { updateSubmissionStatus } from '../../../../services/submission-api';

type Props = {
    submissionData: UserSubmission;
    setData: React.Dispatch<React.SetStateAction<UserSubmission[]>>;
};

const UserSubmissionTableLine = ({ submissionData, setData }: Props) => {
    const { id, name, status, requestDate, confirmDate, action, active } = submissionData;
    const [loading, setLoading] = useState(false);

    const handleActionUpdate = async (newAction: UserSubmissionAction) => {
        setLoading(true);
        try {
            const updatedSubmission = await updateSubmissionStatus(id, newAction);
            setData((prev) =>
                prev ? prev.map((item) => (item.id === id ? updatedSubmission : item)) : []
            );
            showSuccessToast(`${newAction} submission successfully!`);
        } catch (error) {
            showErrorToast('Failed to update submission action!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">
                <span
                    className={`px-2 py-1 text-xs font-medium leading-tight rounded-full ${
                        active === ActiveStatus.Active
                            ? 'text-green-700 bg-green-100'
                            : active === ActiveStatus.Inactive
                            ? 'text-red-700 bg-red-100'
                            : 'text-yellow-700 bg-yellow-100'
                    }`}
                >
                    {status}
                </span>
            </td>
            <td className="px-6 py-4">{requestDate}</td>
            <td className="px-6 py-4">{confirmDate || 'N/A'}</td>
            <td className="px-6 py-4">
                <button
                    onClick={() =>
                        handleActionUpdate(
                            action === UserSubmissionAction.Request
                                ? UserSubmissionAction.Cancel
                                : UserSubmissionAction.Request
                        )
                    }
                    disabled={loading || status !== SubmissionStatus.Waiting}
                    className={`px-3 py-2 text-xs font-medium leading-tight rounded ${
                        action === UserSubmissionAction.Request
                            ? 'bg-red-700 hover:bg-red-800 text-white'
                            : 'bg-blue-700 hover:bg-blue-800 text-white'
                    } ${status !== SubmissionStatus.Waiting ? 'hidden' : ''}`}
                >
                    {loading
                        ? 'Updating...'
                        : action === UserSubmissionAction.Request
                        ? UserSubmissionAction.Cancel
                        : UserSubmissionAction.Request}
                </button>
            </td>
        </tr>
    );
};

export default UserSubmissionTableLine;
