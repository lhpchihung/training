import { useEffect, useState } from 'react';
import TableLine from './TableLine';
import { showErrorToast } from '../../../../utils/toastUtils';
import { fetchAllSubmissions } from '../../../../services/submission-api';
import { AdminSubmission } from '../model';

const Table = () => {
    const [data, setData] = useState<AdminSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const submissions = await fetchAllSubmissions();
                setData(submissions);
            } catch (error) {
                showErrorToast('Error when fetching submissions!');
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading submissions...</p>;

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
                        <th scope="col" className="px-6 py-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((submission) => (
                            <TableLine
                                key={submission.id}
                                submissionData={submission}
                                setData={setData}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center">
                                No submissions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
