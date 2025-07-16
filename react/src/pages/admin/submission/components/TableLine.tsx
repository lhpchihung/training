import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtils';
import PrimaryButton from '../../../../components/ui/Button/PrimaryButton';
import {
    ActiveStatus,
    AdminSubmissionAction,
    SubmissionStatus
} from '../../../../types/submission';
import {
    approveSubmission,
    rejectSubmission,
    setSubmissionActive
} from '../../../../services/submission-api';
import { toCapitalize } from '../../../../utils/functions';
import { AdminSubmission } from '../model';

type Props = {
    submissionData: AdminSubmission;
    setData: React.Dispatch<React.SetStateAction<AdminSubmission[]>>;
};

const TableLine = ({ submissionData, setData }: Props) => {
    const { id, name, status, requestDate, confirmDate, active } = submissionData;
    const [loading, setLoading] = useState(false);
    const [modalAction, setModalAction] = useState<
        AdminSubmissionAction.Approve | AdminSubmissionAction.Reject | null
    >(null);

    const handleAction = async (
        actionType: AdminSubmissionAction.Approve | AdminSubmissionAction.Reject
    ) => {
        setLoading(true);
        try {
            if (actionType === AdminSubmissionAction.Approve) {
                const updated = await approveSubmission(id);
                const refreshed = await setSubmissionActive(updated.userId, updated.id);

                setData((prev) => prev.map((item) => (item.id === id ? refreshed : item)));
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
                    <a href={`/pages/admin/${submissionData.userId}/profile`}>{name}</a>
                </td>
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
                <td
                    className="px-6 py-4 text-center"
                    style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
                >
                    {status === SubmissionStatus.Waiting && (
                        <>
                            <PrimaryButton
                                title="Approve"
                                onClick={() => setModalAction(AdminSubmissionAction.Approve)}
                                padding="px-3 py-2"
                                bgColor="bg-green-700"
                                hoverBgColor="hover:bg-green-800"
                                textColor="text-white"
                            />
                            <PrimaryButton
                                title="Reject"
                                onClick={() => setModalAction(AdminSubmissionAction.Reject)}
                                padding="px-3 py-2"
                                bgColor="bg-red-700"
                                hoverBgColor="hover:bg-red-800"
                                textColor="text-white"
                            />
                        </>
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
                                bgColor={
                                    modalAction === AdminSubmissionAction.Approve
                                        ? 'bg-green-700'
                                        : 'bg-red-700'
                                }
                                hoverBgColor={
                                    modalAction === AdminSubmissionAction.Approve
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
