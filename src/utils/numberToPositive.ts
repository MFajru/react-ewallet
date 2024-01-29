import { formattedNumber } from '@/utils';

const numberToPositive = (strNumbr: string): string => {
  return formattedNumber(Math.abs(parseInt(strNumbr)).toString());
};

export default numberToPositive;
