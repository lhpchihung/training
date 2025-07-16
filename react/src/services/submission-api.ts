import { AdminSubmission } from '../pages/admin/submission/model';
import { UserSubmission } from '../pages/user/submission/model';
import { SubmissionStatus, UserSubmissionAction } from '../types/submission';

const API_URL = 'http://localhost:3001/submissions';

export const fetchUserSubmissions = async (userId: string): Promise<UserSubmission[]> => {
    const response = await fetch(`${API_URL}?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch submissions');
    }
    return await response.json();
};

export const createSubmission = async (submission: UserSubmission): Promise<UserSubmission> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
    });

    if (!response.ok) {
        throw new Error('Failed to create submission');
    }

    return await response.json();
};

export const updateSubmissionStatus = async (
    submissionId: string,
    newAction: UserSubmissionAction
): Promise<UserSubmission> => {
    const patchData: Partial<UserSubmission> = {
        action: newAction
    };

    if (newAction === UserSubmissionAction.Request) {
        patchData.requestDate = new Date().toISOString().split('T')[0];
    }

    const response = await fetch(`${API_URL}/${submissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData)
    });

    if (!response.ok) {
        throw new Error('Failed to update submission');
    }

    return await response.json();
};

export const approveSubmission = async (id: string): Promise<AdminSubmission> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: SubmissionStatus.Approved,
            confirmDate: new Date().toISOString().split('T')[0]
        })
    });

    if (!response.ok) {
        throw new Error('Failed to approve submission');
    }

    return await response.json();
};

export const rejectSubmission = async (id: string): Promise<AdminSubmission> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: SubmissionStatus.Rejected,
            confirmDate: new Date().toISOString().split('T')[0]
        })
    });

    if (!response.ok) {
        throw new Error('Failed to reject submission');
    }

    return await response.json();
};

export const fetchAllSubmissions = async (): Promise<AdminSubmission[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch all submissions');
    }

    const data = await response.json();

    return data.map((item: any) => ({
        id: item.id,
        userId: item.userId,
        name: item.name,
        confirmDate: item.confirmDate,
        status: item.status,
        action: item.action
    }));
};
