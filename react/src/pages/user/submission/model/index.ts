import { SubmissionStatus, UserSubmissionAction } from '../../../../types/submission';

export type UserSubmission = {
    id: string;
    userId: string;
    name: string;
    requestDate: string;
    status: SubmissionStatus;
    action: UserSubmissionAction;
};
