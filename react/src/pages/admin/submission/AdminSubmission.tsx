import React from 'react';
import Table from './components/Table';

const AdminSubmission = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Admin Submission
            </h1>
            <Table />
        </div>
    );
};

export default React.memo(AdminSubmission);
