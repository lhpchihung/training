import React from 'react';
import Table from '../kyc/components/Table';

const AdminKYC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">KYC Submission</h1>
            <Table />
        </div>
    );
};

export default React.memo(AdminKYC);
