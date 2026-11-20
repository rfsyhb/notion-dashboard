import {
  EXPENSE_CATEGORIES,
  type ExpenseCategory,
  type Expense,
  type NetBalance,
} from './types';

export const isExpenseCategory = (val: string): val is ExpenseCategory =>
  EXPENSE_CATEGORIES.some((category) => category === val);

export const categorizedExpenses = (data: Expense[]) => {
  const monthList = data.map((v) => v.Date.slice(0, 7));
  const uniqueMonthList = [...new Set(monthList)].sort().reverse();

  const categorizedByMonth = Object.fromEntries(
    uniqueMonthList.map((month) => [
      month,
      data.filter((expense) => expense.Date.startsWith(month)),
    ]),
  ) as Record<string, Expense[]>;

  return categorizedByMonth;
};

export const formatMonth = (month: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${month}-01T00:00:00Z`));
};

export const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export const calculateNetBalance = (expense: number, income: number): NetBalance => {
  // console.log(income)
  const value = income - expense;
  // console.log(expense)
  const status = value > 0 ? 'surplus' : value < 0 ? 'deficit' : 'balanced';

  return { value, status };
};
