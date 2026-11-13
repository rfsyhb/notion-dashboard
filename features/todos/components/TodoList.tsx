import { getAuthStatus } from '@/lib/auth/auth';
import { AUTH_QUERY_KEY } from '@/lib/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types';
import { TodoCard } from './TodoCard';

export default function TodoList() {
  const [currentFilter, setCurrentFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');

  const { data, isLoading, isError } = useTodos();
  const authQuery = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getAuthStatus,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError && !data) {
    return <p>Failed to load todos</p>;
  }
  if (!data) {
    return <p>No data available</p>;
  }

  const filteredTodos = data.filter((todo: Todo) => {
    if (currentFilter === 'active') return !todo.Status;
    if (currentFilter === 'completed') return todo.Status;
    return true; // for 'all' filter
  });

  const authStatus = authQuery.data?.authenticated;
  if (!authStatus) return <p>unauthorized!</p>;

  return (
    <section className="flex flex-col items-center w-full h-full rounded-md border bg-stone-200 shadow-md">
      <div className="flex gap-2 w-full items-center bg-stone-300 p-2 border-b shadow-sm rounded-ss-md rounded-se-md">
        <button
          onClick={() => setCurrentFilter('all')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${currentFilter === 'all' ? 'bg-mauve-500 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-400'}`}
        >
          All
        </button>
        <button
          onClick={() => setCurrentFilter('active')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${currentFilter === 'active' ? 'bg-mauve-500 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-400'}`}
        >
          Active
        </button>
        <button
          onClick={() => setCurrentFilter('completed')}
          className={`cursor-pointer px-2 py-1 rounded-md text-sm md:text-base transition-colors duration-200 ${currentFilter === 'completed' ? 'bg-mauve-500 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-400'}`}
        >
          Completed
        </button>
      </div>
      <ul className="flex flex-col gap-2 w-full min-h-0 overflow-y-auto px-2 py-1">
        {filteredTodos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoCard id={todo.id} Task={todo.Task} Status={todo.Status} />
          </li>
        ))}
      </ul>
    </section>
  );
}
