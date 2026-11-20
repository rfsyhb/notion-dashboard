import { useQuery } from '@tanstack/react-query';

export const useIncome = () => {
  return useQuery({
    queryKey: ['income'],
    queryFn: async () => {
      const response = await fetch('/api/income');

      if (!response.ok) throw new Error('Failed to fetch income');

      return (await response.json()) as { income: string };
    },
    staleTime: Infinity,
  });
};
