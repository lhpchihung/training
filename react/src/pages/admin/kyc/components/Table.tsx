import { useEffect, useState } from "react";
import { SubmissionData } from "../../../user/personal-information/model";
import TableLine from "../components/TableLine";
import { fetchSubmissions } from "../../../../services/dummy-api";
import { showErrorToast } from "../../../../utils/toastUtils";

type Props = {};

const Table = (props: Props) => {
    const [data, setData] = useState<SubmissionData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchSubmissions();
                setData(result);
            } catch (error) {
                showErrorToast("Error when fetching submissions!");
                console.error("Error fetching submissions:", error);
            }
        };

        fetchData();
    }, []);

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
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((submission, index) => (
                            <TableLine key={index} submissionData={submission} setData={setData} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-center">
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
