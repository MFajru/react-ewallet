import { TTransactionEntries } from '@/types';
import { formattedNumber } from '.';

type TCalculateAmount = {
  income: string;
  expense: string;
};

export const calculateAmount = (
  entries: TTransactionEntries[],
): TCalculateAmount => {
  const amountObj: TCalculateAmount = {
    income: '0',
    expense: '0',
  };
  for (const entry of entries) {
    if (entry.transaction_type_id === 1) {
      const tempSum = parseInt(amountObj.income) + parseInt(entry.amount);
      amountObj.income = tempSum.toString();
    } else if (entry.transaction_type_id === 2) {
      const tempSum =
        parseInt(amountObj.expense) + Math.abs(parseInt(entry.amount));
      amountObj.expense = tempSum.toString();
    }
  }
  amountObj.income = formattedNumber(amountObj.income);
  amountObj.expense = formattedNumber(amountObj.expense);
  return amountObj;
};
