import { useQuery } from '@tanstack/react-query';
import { getFragments } from '../query';

export const FRAGMENTS_QUERY_KEY = ['fragments'];

export function useFragments() {
  return useQuery({
    queryKey: FRAGMENTS_QUERY_KEY,
    queryFn: async () => {
      const result = await getFragments();
      return result.data;
    },
    refetchOnWindowFocus: true,
  });
}
