import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtils';
import PrimaryButton from '../../../../components/ui/Button/PrimaryButton';
import { AdminSubmissionAction, SubmissionStatus } from '../../../../types/submission';
import { approveSubmission, rejectSubmission } from '../../../../services/submission-api';
import { toCapitalize } from '../../../../utils/functions';
import { AdminSubmission } from '../model';

type Props = {
    submissionData: AdminSubmission;
    setData: React.Dispatch<React.SetStateAction<AdminSubmission[]>>;
};

const TableLine = ({ submissionData, setData }: Props) => {
    const { id, name, status, requestDate, confirmDate, action } = submissionData;
    const [loading, setLoading] = useState(false);
    const [modalAction, setModalAction] = useState<'approve' | 'reject' | null>(null);

    const handleAction = async (actionType: 'approve' | 'reject') => {
        setLoading(true);
        try {
            if (actionType === 'approve') {
                const updated = await approveSubmission(id);
                setData((prev) => prev.map((item) => (item.id === id ? updated : item)));
                showSuccessToast('Submission approved!');
            } else {
                const updated = await rejectSubmission(id);
                setData((prev) => prev.map((item) => (item.id === id ? updated : item)));
                showSuccessToast('Submission rejected!');
            }
        } catch (error) {
            showErrorToast('Failed to update submission status');
            console.error(error);
        } finally {
            setLoading(false);
            setModalAction(null);
        }
    };

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4">
                    <a href={`/pages/user/${submissionData.userId}/pi`}>{name}</a>
                </td>
                <td className="px-6 py-4">
                    <span
                        className={`px-2 py-1 text-xs font-medium leading-tight rounded-full ${
                            status === SubmissionStatus.Active
                                ? 'text-green-700 bg-green-100'
                                : status === SubmissionStatus.Inactive
                                ? 'text-red-700 bg-red-100'
                                : 'text-yellow-700 bg-yellow-100'
                        }`}
                    >
                        {status}
                    </span>
                </td>
                <td className="px-6 py-4">{requestDate}</td>
                <td className="px-6 py-4">{confirmDate || 'N/A'}</td>
                <td
                    className="px-6 py-4 text-center"
                    style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
                >
                    {status === SubmissionStatus.Waiting ? (
                        <>
                            <PrimaryButton
                                title="Approve"
                                onClick={() => setModalAction('approve')}
                                padding="px-3 py-2"
                                bgColor="bg-green-700"
                                hoverBgColor="hover:bg-green-800"
                                textColor="text-white"
                            />
                            <PrimaryButton
                                title="Reject"
                                onClick={() => setModalAction('reject')}
                                padding="px-3 py-2"
                                bgColor="bg-red-700"
                                hoverBgColor="hover:bg-red-800"
                                textColor="text-white"
                            />
                        </>
                    ) : (
                        <span
                            className={`px-2 py-1 text-xs font-medium leading-tight rounded-full ${
                                status === SubmissionStatus.Approved
                                    ? 'text-green-700 bg-green-100'
                                    : 'text-red-700 bg-red-100'
                            }`}
                        >
                            {status === SubmissionStatus.Approved ? 'Approved' : 'Rejected'}
                        </span>
                    )}
                </td>
            </tr>

            {modalAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                            <p className="text-lg">
                                Are you sure you want to {modalAction} this submission?
                            </p>
                        </div>
                        <div className="flex justify-center gap-6">
                            <PrimaryButton
                                title="Cancel"
                                onClick={() => setModalAction(null)}
                                padding="px-3 py-2"
                                bgColor="bg-gray-700"
                                hoverBgColor="hover:bg-gray-800"
                                textColor="text-white"
                            />
                            <PrimaryButton
                                title={toCapitalize(modalAction)}
                                loading={loading}
                                onClick={() => handleAction(modalAction)}
                                padding="px-3 py-2"
                                bgColor={modalAction === 'approve' ? 'bg-green-700' : 'bg-red-700'}
                                hoverBgColor={
                                    modalAction === 'approve'
                                        ? 'hover:bg-green-800'
                                        : 'hover:bg-red-800'
                                }
                                textColor="text-white"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableLine;
