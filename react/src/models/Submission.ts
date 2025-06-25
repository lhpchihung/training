import { SubmissionAction, SubmissionStatus } from '../types/submission';

export type SubmissionData = {
    id: string;
    name: string;
    status: SubmissionStatus;
    date: string;
    action: SubmissionAction;
};
