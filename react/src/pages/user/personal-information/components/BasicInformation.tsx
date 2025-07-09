import { useFormContext } from 'react-hook-form';
import { User } from '../model';
import ErrorMessage from '../../../../components/ui/Error/Error';

type Props = {
    disable?: boolean;
};

const BasicInformation = ({ disable = false }: Props) => {
    const {
        register,
        formState: { errors },
        setValue
    } = useFormContext<User>();

    return (
        <div
            className={`border panel rounded-md p-4 dark:text-gray-300 dark:bg-gray-900 ${
                disable ? 'disabled' : ''
            }`}
        >
            <h3 className="text-lg font-medium mb-4 text-blue-800 dark:text-gray-300">
                Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first-name"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        placeholder="Enter your first name"
                        {...register('profile.basicInfor.firstName', {
                            required: 'First name is required'
                        })}
                    />
                    <ErrorMessage errors={errors.profile?.basicInfor?.firstName?.message} />
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-sm font-medium">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        placeholder="Enter your last name"
                        {...register('profile.basicInfor.lastName', { required: 'Last name is required' })}
                    />
                    <ErrorMessage errors={errors.profile?.basicInfor?.lastName?.message} />
                </div>
                <div>
                    <label htmlFor="middle-name" className="block text-sm font-medium">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        id="middle-name"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        placeholder="Enter your middle name"
                        {...register('profile.basicInfor.middleName')}
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dob"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        {...register('profile.basicInfor.dateOfBirth', {
                            required: 'Date of Birth is required',
                            onChange(event) {
                                const birthDate = new Date(event.target.value);
                                const today = new Date();
                                let age = today.getFullYear() - birthDate.getFullYear();
                                const monthDifference = today.getMonth() - birthDate.getMonth();
                                if (
                                    monthDifference < 0 ||
                                    (monthDifference === 0 && today.getDate() < birthDate.getDate())
                                ) {
                                    age--;
                                }
                                setValue('profile.basicInfor.age', age);
                            }
                        })}
                    />
                    <ErrorMessage errors={errors.profile?.basicInfor?.dateOfBirth?.message} />
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        placeholder="Enter your age"
                        {...register('profile.basicInfor.age', {
                            min: {
                                value: 18,
                                message: 'Age is not less than 18'
                            },
                            max: {
                                value: 150,
                                message: 'Age is not greater than 150'
                            }
                        })}
                        readOnly
                    />
                    <ErrorMessage errors={errors.profile?.basicInfor?.age?.message} />
                </div>
            </div>
        </div>
    );
};

export default BasicInformation;
