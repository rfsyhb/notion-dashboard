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
    <section className="flex flex-col gap-3 items-center w-full h-full">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${filter === 'all' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${filter === 'active' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${filter === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Completed
        </button>
      </div>
      <ul className="flex flex-col gap-2 w-full min-h-0 overflow-y-auto">
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
