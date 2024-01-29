import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Navigation';

export const MainLayout = (): JSX.Element => {
  return (
    <>
      <Sidebar />
      <div className="container w-[80%] relative left-[20%]">
        <Outlet />
      </div>
    </>
  );
};
