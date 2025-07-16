import { useFormContext, useFieldArray } from 'react-hook-form';
import ErrorMessage from '../../../../components/ui/Error/Error';
import { User } from '../model';
import { PhoneType, PreferredType } from '../../../../types/user';

type Props = {
    disable?: boolean;
};

const PhonePanel = ({ disable = false }: Props) => {
    const name = 'profile.phones';

    const {
        register,
        formState: { errors },
        control
    } = useFormContext<User>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    });

    return (
        <div
            className={`panel mb-6 dark:text-gray-300 dark:bg-gray-900 ${
                disable ? 'disabled' : ''
            }`}
        >
            <h3 className="text-lg font-medium mb-4 text-blue-800 dark:text-gray-300">Phones</h3>

            {fields.map((item, index) => (
                <fieldset
                    key={item.id}
                    className="grid grid-cols-3 gap-4 border rounded-md p-4 mb-4"
                >
                    <legend className="text-sm font-medium text-gray-600 dark:text-gray-400 flex justify-between w-full gap-2 items-center">
                        <div>Phone #{index + 1}</div>
                        <div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="btn-danger px-2 py-1 rounded-md"
                            >
                                Delete
                            </button>
                            <div className="col-span-3"></div>
                        </div>
                    </legend>

                    <div>
                        <label
                            htmlFor={`${name}.${index}.phoneNumber`}
                            className="block text-sm font-medium"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id={`${name}.${index}.phoneNumber`}
                            {...register(`${name}.${index}.phoneNumber`, {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9+()-\s]*$/,
                                    message: 'Invalid phone number format'
                                }
                            })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color  "
                            placeholder="Enter phone number"
                        />
                        <ErrorMessage
                            errors={errors?.profile?.phones?.[index]?.phoneNumber?.message}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor={`${name}.${index}.type`}
                            className="block text-sm font-medium"
                        >
                            Type
                        </label>
                        <select
                            id={`${name}.${index}.type`}
                            {...register(`${name}.${index}.phoneType`, {
                                required: 'Phone type is required'
                            })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color  "
                        >
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                        </select>
                        <ErrorMessage
                            errors={errors?.profile?.phones?.[index]?.phoneType?.message}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor={`${name}.${index}.preferred`}
                            className="block text-sm font-medium"
                        >
                            Preferred
                        </label>
                        <select
                            id={`${name}.${index}.preferred`}
                            {...register(`${name}.${index}.preferred`, {
                                required: 'Preferred status is required'
                            })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <ErrorMessage
                            errors={errors?.profile?.phones?.[index]?.preferred?.message}
                        />
                    </div>
                </fieldset>
            ))}

            <button
                type="button"
                onClick={() =>
                    append({
                        phoneNumber: '',
                        phoneType: PhoneType.Personal,
                        preferred: PreferredType.False
                    })
                }
                className="btn-primary px-4 py-2 mt-4 rounded-md"
            >
                Add Phone
            </button>
        </div>
    );
};

export default PhonePanel;
