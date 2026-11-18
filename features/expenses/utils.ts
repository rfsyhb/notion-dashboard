import { EXPENSE_CATEGORIES, ExpenseCategory } from './types';

export const isExpenseCategory = (val: string): val is ExpenseCategory =>
  EXPENSE_CATEGORIES.some((category) => category === val);
