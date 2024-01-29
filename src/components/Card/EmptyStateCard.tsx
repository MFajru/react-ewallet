export const EmptyStateCard = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center mt-9">
      <img src="/src/assets/images/empty-state.png" alt="Empty state" />
      <h3 className="font-semibold text-[22px] mt-8">No recent transactions</h3>
      <p className="text-custom-gray font-semibold text-xs">
        Go to transactions page to add some!
      </p>
    </div>
  );
};
