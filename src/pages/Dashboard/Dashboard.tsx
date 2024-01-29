import {
  DashboardCard,
  EmptyStateCard,
  TransactionCard,
} from '@/components/Card';
import { Header } from '@/components/Header';
import { fetchUserInfo } from '@/stores/slices/dashboard/userInfoSlice';
import { fetchUserTransactions } from '@/stores/slices/transactions/userTransactionsSlice';
import { AppDispatch, RootState } from '@/stores/stores';
import { calculateAmount, formattedDate, formattedNumber } from '@/utils';
import numberToPositive from '@/utils/numberToPositive';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { Toaster, toast } from 'sonner';

function Dashboard(): JSX.Element {
  const userInfo = useSelector((state: RootState) => {
    return {
      message: state.userInfo.response.message,
      userId: state.userInfo.response.data.user_id,
      name: state.userInfo.response.data.name,
      email: state.userInfo.response.data.email,
      walletId: state.userInfo.response.data.wallet_id,
      walletNumber: state.userInfo.response.data.wallet_number,
      amount: state.userInfo.response.data.amount,
      status: state.userInfo.status,
    };
  });
  // const login = useSelector((state: RootState) => state.login);
  const userTransactions = useSelector((state: RootState) => {
    return state.userTransactions;
  });
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userInfo.status === 'idle') {
      dispatch(fetchUserInfo());
    }

    dispatch(
      fetchUserTransactions({
        page: 1,
        limit: 3,
        sortBy: '',
        orderDir: '',
      }),
    );
  }, [dispatch]);
  // useEffect(() => {
  //   toast.success('Login successful!');
  // }, []);
  return (
    <>
      <Header>Dashboard</Header>
      {/* {login.status === 'success' && <Toaster richColors />} */}
      {userTransactions.status === 'loading' && <div>Loading...</div>}
      {userTransactions.status === 'success' && (
        <div className="px-5 py-2">
          <h2 className="text-2xl font-semibold lg:text-[28px] lg:mt-6">
            Hello, {userInfo.name}!
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-3 lg:mt-6 gap-[23px]">
            <DashboardCard
              title={
                <p className="text-[22px] font-semibold text-custom-purple">
                  Balance
                </p>
              }
              amount={formattedNumber(userInfo.amount)}
              desc={userInfo.walletNumber}
              color="text-custom-purple"
              bgColor="bg-[#F9F9F9]"
            />
            <DashboardCard
              title={<CalculatorIcon width={30} height={33} color="#33A720" />}
              amount={
                calculateAmount(userTransactions.response.data.entries)[
                  'income'
                ]
              }
              desc="Income"
              color="text-custom-green"
              bgColor="bg-custom-light-green"
              icon={<ArrowTrendingUpIcon width={80} height={80} />}
            />
            <DashboardCard
              title={<CalculatorIcon width={30} height={33} color="#F60707" />}
              amount={
                calculateAmount(userTransactions.response.data.entries)[
                  'expense'
                ]
              }
              desc="Expense"
              color="text-custom-red"
              bgColor="bg-custom-light-red"
              icon={<ArrowTrendingDownIcon width={80} height={80} />}
            />
          </div>
          <h2 className="text-2xl font-semibold mt-16 lg:text-[28px]">
            Recent Transactions
          </h2>
          <p className="text-lg font-semibold text-custom-gray">This Week</p>
          <div className="flex flex-col mt-3 gap-3">
            {userTransactions.response.data.entries.length === 0 && (
              <EmptyStateCard />
            )}
            {userTransactions.response.data.entries.length !== 0 &&
              userTransactions.response.data.entries.map(
                (transaction, idx) =>
                  idx < 3 && (
                    <TransactionCard
                      key={idx}
                      type={transaction.transaction_type_id}
                      title={transaction.description}
                      date={formattedDate(transaction.transaction_date)}
                      amount={numberToPositive(transaction.amount)}
                    />
                  ),
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
