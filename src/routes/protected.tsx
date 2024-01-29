import { isAuthenticated } from '@/utils';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = (): JSX.Element => {
  if (!isAuthenticated()) {
    return <Navigate to={'/login'} />;
  }
  return <Outlet />;
};

export const LoggedInRoutes = (): JSX.Element => {
  if (isAuthenticated()) {
    return <Navigate to={'/'} replace />;
  }
  return <Outlet />;
};
