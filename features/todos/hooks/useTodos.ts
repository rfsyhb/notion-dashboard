import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos, updateTodo } from '../query';
import { UpdateTodoInput } from '../types';

export const TODOS_QUERY_KEY = ['todos'];

export function useTodos() {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: async () => {
      const result = await getTodos();
      return result.data;
    },
    refetchOnWindowFocus: true,
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateTodoInput) => {
      return updateTodo(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TODOS_QUERY_KEY,
      });
    },
  });
}
