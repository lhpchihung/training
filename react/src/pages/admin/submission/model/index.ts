import {
    ActiveStatus,
    AdminSubmissionAction,
    SubmissionStatus
} from '../../../../types/submission';

export type AdminSubmission = {
    id: string;
    userId: string;
    name: string;
    requestDate: string;
    confirmDate?: string;
    active: ActiveStatus;
    status: SubmissionStatus;
    action: AdminSubmissionAction;
};
