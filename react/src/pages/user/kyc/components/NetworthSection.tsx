import { useFormContext } from 'react-hook-form';
import { User } from '../../personal-information/model';

type Props = {
    disable?: boolean;
};

const NetWorthSection = ({ disable = false }: Props) => {
    const { watch, setValue, register } = useFormContext<User>();

    const assets = watch('profile.assets') || [];
    const liabilities = watch('profile.liabilities') || [];
    const incomes = watch('profile.incomes') || [];
    const sourceOfWealths = watch('profile.sourceOfWealths') || [];

    const totalAssets = assets.reduce((total, asset) => total + (Number(asset.amount) || 0), 0);
    const totalLiabilities = liabilities.reduce(
        (total, liability) => total + (Number(liability.amount) || 0),
        0
    );
    const totalIncome = incomes.reduce((total, income) => total + (Number(income.amount) || 0), 0);
    const totalWealth = sourceOfWealths.reduce(
        (total, wealth) => total + (Number(wealth.amount) || 0),
        0
    );

    const netWorth = totalIncome + totalWealth + totalAssets - totalLiabilities;

    setValue('profile.netWorths', netWorth.toString());

    return (
        <div className={`panel dark:text-gray-300 dark:bg-gray-900 ${disable ? 'disabled' : ''}`}>
            <h3 className="text-lg font-medium mb-4">Net Worth</h3>
            <div>
                <label htmlFor="net-worth-total" className="block text-sm font-medium">
                    Total
                </label>
                <input
                    type="number"
                    id="net-worth-total"
                    value={netWorth}
                    {...register('profile.netWorths')}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color dark:text-gray-900"
                    placeholder="Automatically calculated"
                    disabled
                />
            </div>
        </div>
    );
};

export default NetWorthSection;
