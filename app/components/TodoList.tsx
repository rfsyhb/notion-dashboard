import type { Todo } from '@/lib/todos';
import { useTodos } from '@/lib/hooks/useTodos';
import { TodoTask } from './TodoTask';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuthStatus } from '@/lib/auth/auth';

export default function TodoList() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthStatus,
  });
  const authStatus = authQuery.data?.authenticated;
  const { data, isPending, isError } = useTodos();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Failed to load todos</p>;

  const filteredTodos = data.filter((todo: Todo) => {
    if (filter === 'active') return !todo.Status;
    if (filter === 'completed') return todo.Status;
    return true; // for 'all' filter
  });

  return authStatus ? (
    <section className="flex flex-col items-center w-full h-full rounded-md border bg-stone-200 shadow-md">
      <div className="flex gap-2 w-full items-center bg-stone-300 p-2 border-b shadow-sm rounded-ss-md rounded-se-md">
        <button
          onClick={() => setFilter('all')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${filter === 'all' ? 'bg-mauve-500 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-400'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${filter === 'active' ? 'bg-mauve-500 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-400'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${filter === 'completed' ? 'bg-mauve-500 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-400'}`}
        >
          Completed
        </button>
      </div>
      <ul className="flex flex-col gap-2 w-full min-h-0 overflow-y-auto px-2">
        {filteredTodos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoTask id={todo.id} task={todo.Task} checked={todo.Status} />
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <p>unauthorized!</p>
  );
}
