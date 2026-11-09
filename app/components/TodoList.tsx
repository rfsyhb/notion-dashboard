import type { Todo } from '@/lib/todos';
import { useTodos } from '@/lib/hooks/useTodos';
import { TodoTask } from './TodoTask';

export default function TodoList() {
  const { data, isPending, isError } = useTodos();
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Failed to load todos</p>;

  return (
    <ul className="flex flex-col gap-2 max-w-66 max-h-80 overflow-y-auto">
      {data.map((todo: Todo) => (
        <li key={todo.id}>
          <TodoTask id={todo.id} task={todo.Task} checked={todo.Status} />
        </li>
      ))}
    </ul>
  );
}
