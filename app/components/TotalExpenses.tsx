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
          <p className="text-sm md:text-base">Today,{' '}
            {new Intl.DateTimeFormat('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'Asia/Jakarta',
            }).format(new Date())}
          </p>
        </div>
        <table className="text-right border-collapse tabular-nums w-fit text-sm">
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
      <div className="flex-1 flex flex-col border rounded-md min-h-0 shadow-md">
        <div className="bg-gray-200 rounded-se-md rounded-ss-md p-2 border-b shadow-md">
          <p>Latest expenses</p>
        </div>
        <ul className="h-full overflow-y-auto flex flex-col rounded-b-md">
          {expenseData.map((item) => (
            <li
              key={item.id}
              className="rounded-md w-full bg-gray-100 p-1 px-2 cursor-pointer hover:bg-amber-50 flex justify-between"
            >
              <span className="flex-1 truncate">{item.Product}</span>
              <div className="flex flex-row justify-between gap-1 flex-1 text-sm md:text-base">
                <span>{item.Date}</span>
                <span>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(item.IDR)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p>unauthorized!</p>
  );
}
