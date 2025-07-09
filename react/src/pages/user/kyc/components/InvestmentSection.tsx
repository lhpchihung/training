import { useFormContext } from 'react-hook-form';
import { User } from '../../personal-information/model';
import { ExperimentType, RiskPercent } from '../../../../types/user';

type Props = {
    disable?: boolean;
};

const InvestmentSection = ({ disable = false }: Props) => {
    const name = 'profile.investments';

    const {
        register,
        formState: { errors }
    } = useFormContext<User>();

    return (
        <div className={`panel dark:text-gray-300 dark:bg-gray-900 ${disable ? 'disabled' : ''}`}>
            <h3 className="text-lg font-medium mb-4">Investment Experience and Objectives</h3>

            <fieldset className="border rounded-md p-4 mb-4 grid grid-cols-2 gap-4">
                <legend className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Investment Information
                </legend>

                <div>
                    <label htmlFor={`${name}.experiment`} className="block text-sm font-medium">
                        Experience in Financial Markets
                    </label>
                    <select
                        id={`${name}.experiment`}
                        {...register(`${name}.experiment`, { required: 'Experience is required' })}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color dark:text-gray-900"
                    >
                        <option value={ExperimentType.LessThan5Year}>
                            {ExperimentType.LessThan5Year}
                        </option>
                        <option value={ExperimentType.From5to10Year}>
                            {ExperimentType.From5to10Year}
                        </option>
                        <option value={ExperimentType.Over10Year}>
                            {ExperimentType.Over10Year}
                        </option>
                    </select>
                    {errors?.profile?.investments?.experiment && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.profile.investments.experiment?.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor={`${name}.risk-tolerance`} className="block text-sm font-medium">
                        Risk Tolerance
                    </label>
                    <select
                        id={`${name}.risk-tolerance`}
                        {...register(`${name}.riskTolerance`, {
                            required: 'Risk tolerance is required'
                        })}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color dark:text-gray-900"
                    >
                        <option value={RiskPercent.TenPercent}>{RiskPercent.TenPercent}</option>
                        <option value={RiskPercent.ThirtyPercent}>{RiskPercent.ThirtyPercent}</option>
                        <option value={RiskPercent.AllIn}>{RiskPercent.AllIn}</option>
                    </select>
                    {errors?.profile?.investments?.riskTolerance && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.profile.investments.riskTolerance?.message}
                        </p>
                    )}
                </div>
            </fieldset>
        </div>
    );
};

export default InvestmentSection;
