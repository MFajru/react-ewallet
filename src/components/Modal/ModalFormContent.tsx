import { FormEvent, ReactNode } from 'react';
import { Button } from '@/components/Button';

type TModalFormContent = {
  name: string;
  title: string;
  children: ReactNode;
  handleOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const ModalFormContent = ({
  name,
  title,
  children,
  handleOnSubmit,
}: TModalFormContent): JSX.Element => {
  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-[42px] text-custom-purple font-semibold mb-12">
        {title}
      </h1>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleOnSubmit}
        name={name}
      >
        {children}
        <div className="mb-12"></div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
