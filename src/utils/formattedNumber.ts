export const formattedNumber = (amount: string): string => {
  return Number(amount).toLocaleString('en-US');
};
