import { MainLayout } from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { Transactions } from '@/pages/Transactions';
import { useRoutes } from 'react-router-dom';
import { LoggedInRoutes, ProtectedRoutes } from './protected';
import { ButtonWithModal } from '@/components/Modal';

export const AppRoutes = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              path: '/',
              element: <Dashboard />,
            },
            {
              path: '/transactions',
              element: <Transactions />,
            },
            {
              path: '/transfer',
              element: <ButtonWithModal name="transfer" />,
            },
            {
              path: '/topup',
              element: <ButtonWithModal name="topUp" />,
            },
            {
              path: '/logout',
              element: <></>,
            },
          ],
        },
      ],
    },
    {
      element: <LoggedInRoutes />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '*',
      element: <h1>404 Page Not Found</h1>,
    },
  ]);
  return <>{routes}</>;
};
