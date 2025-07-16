import { ActiveStatus, SubmissionStatus, UserSubmissionAction } from '../../../../types/submission';

export type UserSubmission = {
    id: string;
    userId: string;
    name: string;
    requestDate: string;
    confirmDate?: string;
    active: ActiveStatus;
    status: SubmissionStatus;
    action: UserSubmissionAction;
};
