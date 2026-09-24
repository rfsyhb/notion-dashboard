'use client';

import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/lib/expenses';

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
  const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate())}`;
  const currentDateExpensesData = expensesQuery.data.data.filter(
    (v) => v.Date == currentDate,
  );

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

  return (
    <table className="ml-auto text-right border-collapse tabular-nums">
      <thead>
        <tr>
          <td colSpan={2} className='border-b text-center'></td>
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
          <td className="pr-3 text-sm uppercase border-b">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
            })}
          </td>
          <td className="flex flex-row justify-between border-b">
            <span>Rp</span>
            <span>{totalExpensesToday.toLocaleString('id-ID')}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
