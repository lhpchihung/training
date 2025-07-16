export enum SubmissionStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    Pending = 'Pending',
    Waiting = 'Waiting',
    Approved = 'Approved',
    Rejected = 'Rejected'
}

export enum AdminSubmissionAction {
    Approve = 'Approve',
    Reject = 'Reject'
}

export enum UserSubmissionAction {
    Cancel = 'Cancel',
    Request = 'Request'
}
