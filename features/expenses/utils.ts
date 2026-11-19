import {
  EXPENSE_CATEGORIES,
  type ExpenseCategory,
  type Expense,
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
