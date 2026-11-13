import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '../query';

export const EXPENSES_QUERY_KEY = ['expenses'];

export function useExpenses() {
  return useQuery({
    queryKey: EXPENSES_QUERY_KEY,
    queryFn: async () => {
      const result = await getExpenses();
      return result.data;
    },
    refetchOnWindowFocus: true,
  });
}
