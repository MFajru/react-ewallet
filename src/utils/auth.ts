import { RootState } from '@/stores/stores';

import { useSelector } from 'react-redux';
import { checkCookies } from '@/utils/checkCookies';

export const isAuthenticated = (): boolean => {
  checkCookies();
  const userToken = useSelector(
    (state: RootState) => state.login.response.data.token,
  );
  return userToken !== '';
};
