import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

type UpdateDailyTaskInput = {
  id: string;
  'Wake up at'?: string;
  'Make bed'?: boolean;
  'Read 15 min'?: boolean;
  'Treadmill 20 min'?: boolean;
  'Drink 3 litre'?: boolean;
  'Creatine'?: boolean;
  'Yogurt'?: boolean;
  'Fish oil'?: boolean;
  'Weight'?: string;
  'Blood pressure'?: string;
};

export function useDailyTask() {
  return useQuery({
    queryKey: ['daily-tasks'],
    queryFn: async () => {
      const response = await fetch('/api/dailytask');

      if (!response.ok) {
        throw new Error('Failed to fetch daily tasks');
      }

      const result = await response.json();
      return result.data;
    },
    refetchOnWindowFocus: true,
  });
}

export function useUpdateDailyTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateDailyTaskInput) => {
      // console.log('Sending PATCH request with body:', input);
      const response = await fetch('/api/dailytask', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to update daily task');
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['daily-tasks'],
      });
    },
  });
}
