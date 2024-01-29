import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

type TSidebarItem = {
  icon: ReactNode;
  title: string;
  show: boolean | undefined;
};

export function SidebarItem({ icon, title, show }: TSidebarItem): JSX.Element {
  let link = '';
  switch (title) {
    case 'Dashboard':
      link = '/';
      break;
    case 'Transactions':
      link = '/transactions';
      break;
    case 'Transfer':
      link = '/transfer';
      break;
    case 'Top Up':
      link = '/topup';
      break;
    case 'Logout':
      link = '/logout';
      break;
  }
  return (
    <>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? `text-custom-purple` : 'text-custom-gray'
        }
      >
        <div className="flex  items-center">
          {icon}
          <p
            className={`ml-4 font-semibold text-lg ${
              show ? 'block' : 'hidden'
            } lg:block`}
          >
            {title}
          </p>
        </div>
      </NavLink>
    </>
  );
}
