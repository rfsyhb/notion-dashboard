import { GetExpensesPayload } from './types';

export async function getExpenses(): Promise<GetExpensesPayload> {
  const response = await fetch('/api/expenses');

  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }

  return response.json();
}
