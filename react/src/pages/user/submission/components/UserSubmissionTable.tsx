import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { showErrorToast } from '../../../../utils/toastUtils';
import UserSubmissionTableLine from './UserSubmissionTableLine';
import { UserSubmission } from '../model';
import { fetchUserSubmissions } from '../../../../services/submission-api';
import { SubmissionStatus } from '../../../../types/submission';

const UserSubmissionTable = () => {
    const { id: userId } = useParams<{ id: string }>();
    const [data, setData] = useState<UserSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) return;
                const result = await fetchUserSubmissions(userId);
                setData(result);
            } catch (error) {
                showErrorToast('Error when fetching submissions!');
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // const hasWaiting = data.some((s) => s.status === SubmissionStatus.Waiting);
    const hasWaiting = false;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Submissions</h2>
                <Link
                    to={`/pages/user/${userId}/submissions/create`}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                        hasWaiting
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-blue-700 hover:bg-blue-800 text-white'
                    }`}
                    onClick={(e) => {
                        if (hasWaiting) {
                            e.preventDefault();
                            showErrorToast('You already have a pending submission.');
                        }
                    }}
                >
                    Create Submission
                </Link>
            </div>

            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : data.length === 0 ? (
                <div className="text-center text-gray-600 py-8">No submissions found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Request Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Confirm Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((submission) => (
                                <UserSubmissionTableLine
                                    key={submission.id}
                                    submissionData={submission}
                                    setData={setData}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserSubmissionTable;
