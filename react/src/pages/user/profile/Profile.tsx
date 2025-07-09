import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/ui/Breadcrumb/Breadcrumb';
import { User, Profile } from '../personal-information/model';
import SingleField from './components/SingleField';
import { fetchUserData, updateUserData } from '../../../services/user';
import { Link } from 'react-router-dom';
import NoProfile from './components/NoProfile';

const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Personal Information', current: true }
];

const ProfilePage = () => {
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserData();
                setUserData(data);
            } catch (error) {
                console.error('Error loading user data:', error);
                setUserData(null);
            }
        };

        loadUserData();
    }, []);

    if (!userData?.profile) {
        return <NoProfile />;
    }

    return (
        <>
            <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
                <Breadcrumb items={breadcrumbItems} />

                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                        <img
                            className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                            src="/images/users/bonnie-green-2x.png"
                            alt="User picture"
                        />
                        <div>
                            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                Profile picture
                            </h3>
                            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                JPG, GIF or PNG. Max size of 800K
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Upload picture
                                </button>
                                <button
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">
                        General information
                    </h3>
                    <form>
                        <fieldset disabled={true}>
                            <div className="grid grid-cols-6 gap-6">
                                <SingleField
                                    infor={userData.profile.basicInfor.firstName}
                                    name="First Name"
                                />
                                <SingleField
                                    infor={userData.profile.basicInfor.lastName}
                                    name="Last Name"
                                />
                                <SingleField
                                    infor={userData.profile.addresses[0].country}
                                    name="Country"
                                />
                                <SingleField
                                    infor={userData.profile.addresses[0].city}
                                    name="City"
                                />
                                <SingleField
                                    infor={userData.profile.addresses[0].street}
                                    name="Address"
                                />
                                <SingleField
                                    infor={userData.profile.emails[0].emailAddress}
                                    name="Email"
                                />
                                <SingleField
                                    infor={userData.profile.phones[0].phoneNumber}
                                    name="Phone"
                                />
                                <SingleField
                                    infor={userData.profile.basicInfor.dateOfBirth}
                                    name="Birth Day"
                                />
                                <SingleField
                                    infor={userData.profile.organization ?? ''}
                                    name="Organization"
                                />
                                <SingleField infor={userData.profile.role} name="Role" />
                                <SingleField
                                    infor={userData.profile.department ?? ''}
                                    name="Department"
                                />
                                <SingleField
                                    infor={userData.profile.addresses[0].postalCode ?? ''}
                                    name="ZIP/Postal Code"
                                />
                                <div className="col-span-6 sm:col-full">
                                    <Link
                                        to={`${userData.id}/pi`}
                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`${userData.id}/kyc`}
                                        className="ml-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        KYC
                                    </Link>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
