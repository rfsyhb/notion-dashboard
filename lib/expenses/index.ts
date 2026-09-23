export type Expense = {
  id: string;
  Product: string;
  Date: string;
  IDR: number;
  Image: string;
};

export type GetExpensePayload = {
  data: Expense[],
  nextCursor: null | string,
  hasMore: boolean
}

export async function getExpenses(): Promise<GetExpensePayload> {
  const response = await fetch('/api/expenses');

  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }

  return response.json();
}