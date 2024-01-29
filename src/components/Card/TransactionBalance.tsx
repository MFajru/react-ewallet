type TBalance = {
  amount: string;
  walletNumber: string;
};
export const TransactionBalance = ({
  amount,
  walletNumber: accNumber,
}: TBalance): JSX.Element => {
  return (
    <div>
      <p className="font-semibold text-[42px]">IDR {amount}</p>
      <p className="text-custom-gray">Total balance from account {accNumber}</p>
    </div>
  );
};
