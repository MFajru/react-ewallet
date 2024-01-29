import { LoginState, addCookiesLogin } from '@/stores/slices/auth/loginSlice';
import { RootState } from '@/stores/stores';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const checkCookies = (): void => {
  const cookiesToken = Cookies.get('token');
  const user = useSelector((state: RootState) => {
    return {
      token: state.login.response.data.token,
      status: state.login.status,
    };
  });
  if (cookiesToken && user.token === '') {
    const dispatch = useDispatch();
    const cookiesResponse = {
      response: {
        message: 'success',
        data: {
          token: cookiesToken,
        },
      },
      status: 'success',
    };
    dispatch(addCookiesLogin(cookiesResponse as LoginState));
  }
};
