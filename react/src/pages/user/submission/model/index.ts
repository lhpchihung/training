import { SubmissionAction, UserSubmissionAction } from '../../../../types/submission';

export type UserSubmission = {
    id: string;
    name: string;
    requestDate: string;
    confirmDate?: string;
    status: SubmissionAction;
    action: UserSubmissionAction;
};
