export type Todo = {
  id: string;
  Task: string;
  Status: boolean;
};

export type GetTodosPayload = {
  data: Todo[];
  nextCursor: null | string;
  hasMore: boolean;
};

export async function getTodos(): Promise<GetTodosPayload> {
  const response = await fetch('/api/todos');

  if (!response.ok) {
    throw new Error('Failed to fetch daily tasks');
  }

  return response.json();
}
