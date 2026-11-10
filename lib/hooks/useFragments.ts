import { useQuery } from '@tanstack/react-query';

export const FRAGMENTS_QUERY_KEY = ['fragments'];

export function useFragments() {
  return useQuery({
    queryKey: FRAGMENTS_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch('/api/fragments');

      if (!response.ok) {
        throw new Error('Failed to fetch fragments');
      }

      const result = await response.json();
      return result.data;
    },
    refetchOnWindowFocus: true,
  });
}
