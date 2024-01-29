import { Button } from '@/components/Button';
import { ReactNode } from 'react';

type THeader = {
  children: ReactNode;
};

export const Header = ({ children }: THeader): JSX.Element => {
  return (
    <div className="border-b flex justify-between pl-5 py-5 lg:px-12 items-center">
      <h1 className="font-semibold text-custom-gray text-xl lg:text-2xl">
        {children}
      </h1>
      <div className="pr-5 flex items-center">
        <Button type="button" variants="plain">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Avatar"
            height={45}
            width={45}
            className="rounded-full"
          />
        </Button>
      </div>
    </div>
  );
};
