import {
    AddressType,
    AssetType,
    EmailType,
    ExperimentType,
    IdentificationType,
    IncomeType,
    LiabilityType,
    OccupationType,
    PhoneType,
    PreferredType,
    RiskPercent,
    SourceOfWealthType,
    UserRole
} from '../../../../types/user';

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    profile?: Profile | null;
};

export type Profile = {
    role: UserRole;
    basicInfor: BasicInfor;
    organization?: string;
    department?: string;
    phones: UserPhone[];
    emails: UserEmail[];
    addresses: UserAddress[];
    identification: UserIdentification[];
    occupation: UserOccupation[];
    incomes?: Income[];
    assets?: Asset[];
    liabilities?: Liability[];
    sourceOfWealths?: SourceOfWealth[];
    netWorths?: string;
    investments?: Investment;
};

export type BasicInfor = {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    age: number;
};

export type ContactInfor = {
    addresses: UserAddress[];
    emails: UserEmail[];
    phones: UserPhone[];
    identifications: UserIdentification[];
    occupations: string;
};

export type UserAddress = {
    country: string;
    city: string;
    street: string;
    postalCode?: string;
    addressType: AddressType;
};

export type UserEmail = {
    emailAddress: string;
    emailType: EmailType;
    preferred: PreferredType;
};

export type UserPhone = {
    phoneNumber: string;
    phoneType: PhoneType;
    preferred: PreferredType;
};

export type UserIdentification = {
    idType: IdentificationType;
    expiryDate: string;
    file?: File;
};

export type UserOccupation = {
    occupationType: OccupationType;
    fromDate: string;
    toDate: string;
};

export type Income = {
    incomeType: IncomeType;
    amount: string;
};

export type Asset = {
    assetType: AssetType;
    amount: string;
};

export type Liability = {
    liabilityType: LiabilityType;
    amount: string;
    totalAmount: string;
};

export type SourceOfWealth = {
    sourceOfWealthType: SourceOfWealthType;
    amount: string;
    totalAmount: string;
};

export type Investment = {
    experiment: ExperimentType;
    riskTolerance: RiskPercent;
};
