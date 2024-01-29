import { ReactNode } from 'react';

type TDashboardCard = {
  icon?: ReactNode;
  title: ReactNode;
  amount: string;
  desc: string;
  color: string;
  bgColor: string;
};

export const DashboardCard = ({
  icon,
  title,
  amount,
  desc,
  color,
  bgColor,
}: TDashboardCard): JSX.Element => {
  return (
    <div
      className={`flex ${bgColor} gap-7 justify-between px-[26px] py-[22px] rounded-[15px]`}
    >
      <div className="flex flex-col gap-5">
        {title}
        <p className="text-[28px] font-semibold">IDR {amount}</p>
        <p className={`${color} text-sm lg:text-base font-semibold`}>{desc}</p>
      </div>
      <div className="hidden lg:flex lg:items-center">{icon}</div>
    </div>
  );
};
