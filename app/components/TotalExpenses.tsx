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

  const totalExpenses =
    expenseData.reduce((total, expense) => total + expense.IDR, 0) ?? 0;
  const totalExpensesThisMonth =
    currentMonthExpensesData.reduce(
      (total, expense) => total + expense.IDR,
      0,
    ) ?? 0;

  return (
    <div className="flex flex-col px-1 text-right">
      <p className="">
        <span className="text-sm uppercase">All time</span> Rp
        {totalExpenses.toLocaleString('id-ID')}
      </p>
      <p className="">
        <span className="text-sm uppercase">
          {MONTH[new Date().getMonth()]}
        </span>{' '}
        Rp
        {totalExpensesThisMonth.toLocaleString('id-ID')}
      </p>
    </div>
  );
}
