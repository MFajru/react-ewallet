import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import { SidebarItem } from '@/components/Navigation';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { ButtonWithModal } from '../Modal';

export function Sidebar(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>();

  return (
    <>
      <div
        className={`${
          isExpanded ? 'w-[15rem]' : 'w-[20%]'
        } lg:w-[20%] bg-[#F6F4F5] min-h-screen fixed left-0 px-5 md:px-7 py-9 z-10 rounded-tr-[20px] rounded-br-[10px] flex flex-col justify-between lg:justify-normal gap-60 items-center lg:items-start transition-[width]`}
      >
        <div>
          <p
            className={`font-bold ${
              isExpanded ? 'text-[28px]' : 'text-sm'
            }  text-custom-purple md:text-[28px] md:leading-9 lg:leading-normal`}
          >
            Sea Wallet
          </p>
        </div>
        <div className="flex flex-col gap-7 lg:h-full ">
          <SidebarItem
            show={isExpanded}
            title="Dashboard"
            icon={<ComputerDesktopIcon width={35} height={35} />}
          />
          <SidebarItem
            show={isExpanded}
            title="Transactions"
            icon={<BanknotesIcon width={35} height={35} />}
          />
          <ButtonWithModal name="transfer" variants="sidebarIcons">
            <CreditCardIcon width={35} height={35} />
            <p className="ml-4 font-semibold text-lg">Transfer</p>
          </ButtonWithModal>
          <ButtonWithModal name="topUp" variants="sidebarIcons">
            <DocumentPlusIcon width={35} height={35} />
            <p className="ml-4 font-semibold text-lg">Top Up</p>
          </ButtonWithModal>
          <ButtonWithModal name="logout" variants="sidebarIcons">
            <ArrowRightOnRectangleIcon width={35} height={35} />
            <p className="ml-4 font-semibold text-lg">Logout</p>
          </ButtonWithModal>
        </div>
        <Button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          variants="sidebarIcon"
        >
          {isExpanded ? (
            <ChevronDoubleLeftIcon width={35} height={35} />
          ) : (
            <ChevronDoubleRightIcon width={35} height={35} />
          )}
        </Button>
      </div>
    </>
  );
}
