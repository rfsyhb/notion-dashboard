export type Todo = {
  id: string;
  Task: string;
  Status: boolean;
  'Created time': string;
};

export type TodoCardProps = Omit<Todo, 'Created time'>;

export type CreateTodoInput = Omit<Todo, 'id' | 'Created time' | 'Status'>;

export type UpdateTodoInput = Omit<Todo, 'Task' | 'Status' | 'Created time'> & {
  Task?: string;
  Status?: boolean;
};

export type GetTodosPayload = {
  data: Todo[];
  nextCursor: null | string;
  hasMore: boolean;
};
