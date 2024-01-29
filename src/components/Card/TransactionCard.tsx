import { CalculatorIcon } from '@heroicons/react/24/outline';

type TTransactionCard = {
  type: number;
  title: string;
  date: string;
  amount: string;
};

export function TransactionCard({
  type,
  title,
  date,
  amount,
}: TTransactionCard): JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between lg:items-center border-2 rounded-[15px] px-6 py-5">
      <CalculatorIcon
        width={50}
        height={50}
        className={`hidden lg:block ${
          type === 2 ? 'text-custom-red' : 'text-custom-green'
        }`}
      />
      <p className="text-lg font-semibold lg:w-1/4">{title}</p>
      <p className="text-lg font-semibold lg:w-1/4">{date}</p>
      <p
        className={`text-lg font-semibold ${
          type === 2 ? 'text-custom-red' : 'text-custom-green'
        } -order-1 lg:order-1 lg:w-1/5`}
      >
        IDR {amount}
      </p>
    </div>
  );
}
