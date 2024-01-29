import { Button } from '@/components/Button';
import { TransactionBalance } from '@/components/Card/';
import { DropdownButton } from '@/components/Dropdown';
import { Header } from '@/components/Header';
import { ButtonWithModal } from '@/components/Modal';
import { Table } from '@/components/Table';
import { fetchUserInfo } from '@/stores/slices/dashboard/userInfoSlice';
import { fetchUserTransactions } from '@/stores/slices/transactions/userTransactionsSlice';
import { AppDispatch, RootState } from '@/stores/stores';
import { formattedNumber } from '@/utils';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CreditCardIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Transactions = (): JSX.Element => {
  const limit = 8;
  const userTransactions = useSelector((state: RootState) => {
    return state.userTransactions;
  });

  const userInfo = useSelector((state: RootState) => {
    return {
      walletNumber: state.userInfo.response.data.wallet_number,
      amount: state.userInfo.response.data.amount,
      status: state.userInfo.status,
    };
  });
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string[]>(['Date', 'Desc']);
  // const [type, setType] = useState<string[]>(['All']);
  useEffect(() => {
    if (userInfo.status === 'idle') {
      dispatch(fetchUserInfo());
    }
    if (userTransactions.status === 'idle') {
      dispatch(
        fetchUserTransactions({
          page: page,
          limit: limit,
          sortBy: sortOrder[0],
          orderDir: sortOrder[1],
        }),
      );
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchUserTransactions({
        page: page,
        limit: limit,
        sortBy: sortOrder[0],
        orderDir: sortOrder[1],
      }),
    );
  }, [page, sortOrder[0], sortOrder[1]]);
  return (
    <>
      <Header>Transactions</Header>
      {userInfo.status === 'loading' && <div>Loading...</div>}
      {userInfo.status === 'success' && (
        <>
          <div className="px-5 py-2 lg:px-12 lg:py-6">
            <TransactionBalance
              amount={formattedNumber(userInfo.amount)}
              walletNumber={userInfo.walletNumber}
            />
            <div className="flex flex-col gap-3">
              <div className="flex gap-[14px] justify-end">
                {/* <div className="flex items-center gap-[14px]">
                  <p className="font-bold text-xs">Type</p>
                  <DropdownButton
                    onClick={setType}
                    buttonText={`${type[0]}`}
                    dropDownList={['All', 'Transfer', 'Top ']}
                    dropdownVar="small"
                  />
                </div> */}
                <div className="flex items-center gap-[14px] justify-end">
                  <p className="font-bold text-xs">Sort</p>
                  <DropdownButton
                    onClick={setSortOrder}
                    buttonText={`${sortOrder[0]} - ${sortOrder[1]}`}
                    dropDownList={[
                      'Date - Desc',
                      'Date - Asc',
                      'Amount - Desc',
                      'Amount - Asc',
                    ]}
                    dropdownVar="big"
                  />
                </div>
              </div>
              {userTransactions.status === 'loading' && <div>Loading...</div>}
              {userTransactions.status === 'success' && (
                <>
                  <Table />
                  <div className="flex gap-2">
                    {page === 1 ? (
                      <Button
                        onClick={() => setPage(page - 1)}
                        variants="secondaryIcon"
                        disabled
                      >
                        <ArrowLeftIcon width={20} hanging={20} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setPage(page - 1)}
                        variants="secondaryIcon"
                      >
                        <ArrowLeftIcon width={20} hanging={20} />
                      </Button>
                    )}
                    {page ===
                    Math.ceil(
                      userTransactions.response.data.page_info.total_row /
                        limit,
                    ) ? (
                      <Button
                        onClick={() => setPage(page + 1)}
                        variants="secondaryIcon"
                        disabled
                      >
                        <ArrowRightIcon width={20} hanging={20} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setPage(page + 1)}
                        variants="secondaryIcon"
                      >
                        <ArrowRightIcon width={20} hanging={20} />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-4 justify-end">
              <ButtonWithModal name="transfer" variants="icon">
                <CreditCardIcon width={20} height={20} />
                Transfer +
              </ButtonWithModal>
              <ButtonWithModal name="topUp" variants="icon">
                <DocumentPlusIcon width={20} height={20} />
                Top Up +
              </ButtonWithModal>
            </div>
          </div>
        </>
      )}
    </>
  );
};
