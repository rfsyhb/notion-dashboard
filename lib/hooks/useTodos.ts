import type { UpdateTodosInput } from '@/lib/notion/mutations';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

export const TODOS_QUERY_KEY = ['todos'];

export function useTodos() {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch('/api/todos');

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const result = await response.json();
      return result.data;
    },
    refetchOnWindowFocus: true,
  });
}

export function useUpdateTodos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateTodosInput) => {
      // console.log('Sending PATCH request with body:', input);
      const response = await fetch('/api/todos', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TODOS_QUERY_KEY,
      });
    },
  });
}
