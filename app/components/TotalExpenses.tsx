'use client';

import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/lib/expenses';

export function TotalExpenses() {
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
    <div className="flex flex-col gap-2 p-2 text-right">
      <p className=""><span>Total</span> Rp{totalExpenses.toLocaleString('id-ID')}</p>
      <p className="">
        <span>Bulan</span> ini Rp{totalExpensesThisMonth.toLocaleString('id-ID')}
      </p>
    </div>
  );
}
