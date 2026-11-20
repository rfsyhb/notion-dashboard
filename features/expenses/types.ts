export const EXPENSE_CATEGORIES = [
  'Groceries',
  'Dining',
  'Refreshment',
  'Other',
  'Personal Care',
  'Entertainment',
  'Cooking',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type Expense = {
  id: string;
  Product: string;
  Date: string;
  IDR: number;
  Category: ExpenseCategory;
};

export type GetExpensesPayload = {
  data: Expense[];
  nextCursor: string;
  hasMore: string;
};

export type InputExpensePayload = Omit<Expense, 'id'> & {
  imageFileUploadId?: string;
  imageName?: string;
};

export type NetBalance = {
  value: number;
  status: 'surplus' | 'deficit' | 'balanced';
};
