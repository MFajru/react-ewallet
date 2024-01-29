import moment from 'moment';

export const formattedDate = (date: string): string => {
  return moment(date).format('DD MMMM YYYY');
};
