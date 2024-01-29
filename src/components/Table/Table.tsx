import { useSelector } from 'react-redux';
import { RootState } from '@/stores/stores';
import { formattedDate, formattedNumber } from '@/utils';

export const Table = (): JSX.Element => {
  const userTransactions = useSelector((state: RootState) => {
    return state.userTransactions;
  });

  return (
    <>
      <table className="w-full border-separate border border-gray-200 border-spacing-x-3 rounded-xl">
        <thead className="text-xs text-custom-dark-gray">
          <tr>
            <th className="text-left py-4">DATE</th>
            <th className="text-left py-4">DESCRIPTION</th>
            <th className="text-right py-4">AMOUNT</th>
          </tr>
        </thead>
        <tbody className="text-custom-darker-gray text-sm">
          {userTransactions.response.data.entries.map((entry, idx) => (
            <tr key={idx}>
              <td className="border-t border-gray-200 align-middle py-4">
                {formattedDate(entry.transaction_date)}
              </td>
              <td className="font-light border-t border-gray-200 align-middle py-4">
                {entry.description}
              </td>
              <td
                className={`text-right font-light border-t border-gray-200 py-4 ${
                  entry.transaction_type_id === 1
                    ? 'text-custom-green'
                    : 'text-custom-red'
                } `}
              >
                {entry.transaction_type_id === 1
                  ? `+ IDR ${formattedNumber(entry.amount)}`
                  : `- IDR ${formattedNumber(entry.amount)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
