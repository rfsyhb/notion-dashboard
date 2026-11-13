import { GetTodosPayload, Todo, UpdateTodoInput } from './types';

export async function getTodos(): Promise<GetTodosPayload> {
  const response = await fetch('/api/todos');

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
}

export async function updateTodo(input: UpdateTodoInput): Promise<Todo> {
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
}
