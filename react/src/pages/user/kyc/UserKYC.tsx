import { FormProvider, useForm } from 'react-hook-form';
import Breadcrumb from '../../../components/ui/Breadcrumb/Breadcrumb';
import AssetSession from './components/AssetSection';
import InvestmentSection from './components/InvestmentSection';
import LiabilitySection from './components/LiabilitySection';
import NetWorthSection from './components/NetWorthSection';
import WealthSection from './components/WealthSection';
import { User } from '../personal-information/model';
import IncomeSession from './components/IncomeSession';
import { useEffect, useState } from 'react';
import BasicInformation from '../personal-information/components/BasicInformation';
import AddressPanel from '../personal-information/components/AddressPanel';
import EmailPanel from '../personal-information/components/EmailPanel';
import PhonePanel from '../personal-information/components/PhonePanel';
import Identification from '../personal-information/components/Identification';
import Occupation from '../personal-information/components/Occupation';
import { showErrorToast, showSuccessToast } from '../../../utils/toastUtils';
import PrimaryButton from '../../../components/ui/Button/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserDataById, updateUserData } from '../../../services/user-api';

const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Users', href: '/' },
    { label: 'Personal KYC', current: true }
];

type Props = {
    disable?: boolean;
};

const UserKYC = ({ disable = true }: Props) => {
    const methods = useForm<User>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch user data by ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) throw new Error('Missing user ID in URL');
                const data = await fetchUserDataById(id);
                methods.reset(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                showErrorToast(`Failed to load user data: ${String(error)}`);
            }
        };

        fetchData();
    }, [id, methods]);

    const onSubmit = methods.handleSubmit(async (data) => {
        setLoading(true);
        try {
            if (!id) throw new Error('Missing user ID');
            data.id = id;
            await updateUserData(data);
            showSuccessToast('KYC submitted successfully!');
            navigate(`/pages/user/${id}/profile`);
        } catch (error) {
            console.error('Error updating user data:', error);
            showErrorToast(`Updating error: ${String(error)}`);
        } finally {
            setLoading(false);
        }
    });

    return (
        <div
            className={`grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900 ${
                disable ? 'disabled' : ''
            }`}
        >
            <Breadcrumb items={breadcrumbItems} />

            <FormProvider {...methods}>
                <form
                    className="mt-6 space-y-6 dark:text-gray-300 dark:bg-gray-900"
                    onSubmit={onSubmit}
                >
                    <BasicInformation />
                    <div className="border panel rounded-md p-4 dark:text-gray-300 dark:bg-gray-900">
                        <h3 className="text-lg font-medium mb-4 text-blue-800 dark:text-gray-300">
                            Contact Information
                        </h3>
                        <AddressPanel />
                        <EmailPanel />
                        <PhonePanel />
                        <Identification />
                        <Occupation />
                    </div>
                    <IncomeSession />
                    <AssetSession />
                    <LiabilitySection />
                    <WealthSection />
                    <NetWorthSection />
                    <InvestmentSection />
                    <div className="text-right">
                        <PrimaryButton title="Submit" loading={loading} onClick={onSubmit} />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default UserKYC;
