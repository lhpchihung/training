import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Breadcrumb from '../../../components/ui/Breadcrumb/Breadcrumb';
import BasicInformation from './components/BasicInformation';
import Identification from './components/Identification';
import Occupation from './components/Occupation';
import AddressPanel from './components/AddressPanel';
import PhonePanel from './components/PhonePanel';
import EmailPanel from './components/EmailPanel';
import PrimaryButton from '../../../components/ui/Button/PrimaryButton';
import { showErrorToast, showSuccessToast } from '../../../utils/toastUtils';
import { User } from './model';
import { fetchUserDataById, updateUserData } from '../../../services/user-api';

const breadcrumbItems: { label: string; href?: string; current?: boolean }[] = [
    { label: 'Home', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Personal Information', current: true }
];

type Props = {
    disable?: boolean;
};

const PersonalInformation = ({ disable = false }: Props) => {
    const { id } = useParams();
    const methods = useForm<User>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                if (!id) throw new Error('User ID not found in URL');

                const data = await fetchUserDataById(id);
                if (data.profile) {
                    methods.reset(data);
                }
            } catch (error) {
                showErrorToast(`Fetching data error: ${String(error)}`);
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [methods]);

    const onSubmit = methods.handleSubmit(async (data: User) => {
        setLoading(true);
        try {
            if (!id) throw new Error('User ID not found in URL');

            data.id = id;

            await updateUserData(data);

            showSuccessToast('Updated successfully!');
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
                <form className="mt-6 space-y-6" onSubmit={onSubmit}>
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
                    <div className="text-right">
                        <PrimaryButton title="Submit" loading={loading} onClick={onSubmit} />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default PersonalInformation;
