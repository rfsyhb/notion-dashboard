'use client';

import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/lib/expenses';
import { getAuthStatus } from '@/lib/auth/auth';

export function TotalExpenses() {
  const MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthStatus,
  });
  const authStatus = authQuery.data?.authenticated;

  const expensesQuery = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  if (expensesQuery.isPending) {
    return <p>Loading...</p>;
  }

  if (expensesQuery.isError) {
    return <p>{expensesQuery.error.message}</p>;
  }

  const expenseData = expensesQuery.data.data;

  const now = new Date();
  // ex "2026-09"
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1,
  ).padStart(2, '0')}`;
  const currentMonthExpensesData = expensesQuery.data.data.filter((v) =>
    v.Date.startsWith(currentMonth),
  );
  // ex "2026-09-24"
  const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  // console.log('currentDate', currentDate);
  const currentDateExpensesData = expensesQuery.data.data.filter(
    (v) => v.Date == currentDate,
  );
  // console.log('currentDateExpensesData', currentDateExpensesData);

  const totalExpenses =
    expenseData.reduce((total, expense) => total + expense.IDR, 0) ?? 0;
  const totalExpensesThisMonth =
    currentMonthExpensesData.reduce(
      (total, expense) => total + expense.IDR,
      0,
    ) ?? 0;
  const totalExpensesToday =
    currentDateExpensesData.reduce(
      (total, expense) => total + expense.IDR,
      0,
    ) ?? 0;

  return authStatus ? (
    <div className="flex flex-col justify-center w-full gap-3 h-full">
      <div className="shrink p-2 px-3 rounded-md shadow-md w-full flex flex-row justify-between bg-gray-100 border">
        <div className="w-full flex justify-center items-center">
          <p className="text-sm md:text-base">spending</p>
        </div>
        <table className="text-right border-collapse tabular-nums w-fit text-sm md:text-base">
          <thead>
            <tr>
              <td colSpan={2} className="text-center"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-3 text-sm uppercase">All time</td>
              <td className="flex flex-row justify-between text-right">
                <span>Rp</span>
                <span>{totalExpenses.toLocaleString('id-ID')}</span>
              </td>
            </tr>

            <tr>
              <td className="pr-3 text-sm uppercase">
                {MONTH[new Date().getMonth()]}
              </td>
              <td className="flex flex-row justify-between text-right">
                <span>Rp</span>
                <span>{totalExpensesThisMonth.toLocaleString('id-ID')}</span>
              </td>
            </tr>

            <tr>
              <td className="pr-3 text-sm uppercase ">
                {new Date().toLocaleDateString('id-ID', {
                  weekday: 'long',
                })}
              </td>
              <td className="flex flex-row justify-between ">
                <span>Rp</span>
                <span>{totalExpensesToday.toLocaleString('id-ID')}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex-1 border rounded-md h-full">
        <div className="bg-gray-200 rounded-se-md rounded-ss-md p-2 border-b shadow-md">
          <p>Latest expenses</p>
        </div>
        <ul className="h-full overflow-y-auto">
          {expenseData.map((item) => (
            <p key={item.id}>{item.Product}</p>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p>unauthorized!</p>
  );
}
