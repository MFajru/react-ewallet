import { ButtonHTMLAttributes, FormEvent, ReactNode, useState } from 'react';
import { ModalFormContent } from '@/components/Modal';
import { InputField } from '@/components/Form';
import { Button } from '@/components/Button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { DropdownButton } from '../Dropdown';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/stores';
import { formattedNumber } from '@/utils';
import customFetch from '@/lib/customFetch';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { fetchUserTransactions } from '@/stores/slices/transactions/userTransactionsSlice';
import { fetchUserInfo } from '@/stores/slices/dashboard/userInfoSlice';
import { removeCookies } from '@/stores/slices/auth/loginSlice';

interface TButtonWithModal extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: 'icon' | 'sidebarIcon' | 'sidebarIcons';
  name: 'transfer' | 'topUp' | 'logout';
}

type TFormData = {
  wallet_to?: string;
  amount: string;
  description?: string;
  source_of_funds_id?: number;
};

export const ButtonWithModal = ({
  children,
  variants,
  name,
  ...props
}: TButtonWithModal): JSX.Element => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<TFormData>({
    wallet_to: '',
    amount: '',
    description: '',
  });
  const [sourceOfFunds, setSourceOfFunds] = useState<string[]>([
    'Choose source of funds',
    '0',
  ]);

  const userAmount = useSelector(
    (state: RootState) => state.userInfo.response.data.amount,
  );
  const dispatch = useDispatch<AppDispatch>();

  let style;
  switch (variants) {
    case 'icon':
      style =
        'bg-custom-purple flex text-white py-2 px-4 rounded-xl gap-2 items-center';
      break;
    case 'sidebarIcon':
      style = 'w-full text-custom-gray flex justify-center lg:hidden';
      break;
    case 'sidebarIcons':
      style = 'w-full text-custom-gray flex justify-start items-center';
      break;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((existingData) => {
      return { ...existingData, [e.target.name]: e.target.value };
    });
  };

  const handleOnClose = () => {
    setIsShow(!isShow);
    setFormData({
      wallet_to: '',
      amount: '',
      description: '',
    });
  };

  const fetchTransfer = async () => {
    try {
      const token = Cookies.get('token');
      const response = await customFetch('transactions/transfers', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: formData.amount,
          wallet_to: formData.wallet_to,
          description: formData.description,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened, ${result.message}`);
      }

      toast.success('Transfer success!');
    } catch (error) {
      console.error(error);
      toast.error(error as ReactNode);
      throw error;
    }
  };

  const handleOnTransfer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchTransfer();
    dispatch(
      fetchUserTransactions({
        page: 1,
        limit: 8,
        sortBy: '',
        orderDir: '',
      }),
    );
    dispatch(fetchUserInfo());
    setTimeout(() => {
      setIsShow(!isShow);
    }, 1500);
  };

  const fetchTopUp = async () => {
    try {
      const token = Cookies.get('token');
      const response = await customFetch('transactions/top-ups', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_of_funds_id: parseInt(sourceOfFunds[1]),
          amount: formData.amount,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened, ${result.message}`);
      }
      toast.success('Top Up success!');
    } catch (error) {
      console.error(error);
      toast.error(error as ReactNode);
      throw error;
    }
  };

  const handleOnTopUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchTopUp();
    setTimeout(() => {
      dispatch(
        fetchUserTransactions({
          page: 1,
          limit: 8,
          sortBy: '',
          orderDir: '',
        }),
      );
      dispatch(fetchUserInfo());
      setIsShow(!isShow);
    }, 1500);
  };

  return (
    <>
      <button className={style} {...props} onClick={handleOnClose}>
        {children}
      </button>
      {!isShow ? null : name === 'logout' ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-10">
          <div className="rounded-lg bg-white flex flex-col px-10 py-10 z-20 gap-6">
            <h1 className="text-center text-xl font-semibold">Logout?</h1>
            <div className="flex gap-3">
              <Button onClick={() => dispatch(removeCookies())}>Yes</Button>
              <Button onClick={() => setIsShow(!isShow)} variants="secondary">
                No
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-10">
          <div className="rounded-lg bg-white flex flex-col px-10 py-10 w-[30rem] h-[40rem] z-20">
            <Toaster richColors />
            <div className="flex justify-end">
              <Button variants="modalClose" onClick={() => setIsShow(!isShow)}>
                <XMarkIcon width={30} height={30} />
              </Button>
            </div>
            {name === 'transfer' ? (
              <ModalFormContent
                name="transfer"
                title="Transfer"
                handleOnSubmit={handleOnTransfer}
              >
                <InputField
                  type="number"
                  name="wallet_to"
                  placeholder="Enter destination account number"
                  value={formData.wallet_to!}
                  onChange={handleOnChange}
                />
                <InputField
                  type="number"
                  name="amount"
                  placeholder="Enter amount here"
                  value={formData.amount.toString()}
                  onChange={handleOnChange}
                />
                <p className="text-sm text-custom-gray">
                  Remaining Balance: IDR {formattedNumber(userAmount)}
                </p>
                <InputField
                  type="string"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description!}
                  onChange={handleOnChange}
                />
              </ModalFormContent>
            ) : (
              <ModalFormContent
                name="topUp"
                title="Top Up"
                handleOnSubmit={handleOnTopUp}
              >
                {/* Dropdown field */}
                <DropdownButton
                  onClick={setSourceOfFunds}
                  buttonText={sourceOfFunds[0]}
                  dropDownList={[
                    'Bank Transfer',
                    'Credit Card',
                    'Cash',
                    'Reward',
                  ]}
                  dropdownVar="topUp"
                />
                <InputField
                  type="number"
                  name="amount"
                  placeholder="Enter amount here"
                  value={formData.amount}
                  onChange={handleOnChange}
                />
              </ModalFormContent>
            )}
          </div>
        </div>
      )}
    </>
  );
};
