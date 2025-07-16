import { SubmissionStatus, UserSubmissionAction } from '../../../../types/submission';

export type UserSubmission = {
    id: string;
    userId: string;
    name: string;
    requestDate: string;
    confirmDate?: string;
    status: SubmissionStatus;
    action: UserSubmissionAction;
};
