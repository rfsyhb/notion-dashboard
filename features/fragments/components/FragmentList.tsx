import FragmentCard from './FragmentCard';
import { useFragments } from '../hooks/useFragments';
import type { Fragment } from '../types';
import { AlertCenter } from '@/app/components/AlertCenter';

export default function FragmentList() {
  const { data, isLoading, isError } = useFragments();

    if (isLoading) return <AlertCenter text="loading..." />;
    if (isError && !data) return <AlertCenter text="failed to load fragments" />;
    if (!data) return <AlertCenter text="no data available" />;

  return (
    <section className="h-full w-full flex flex-col bg-olive-200 border shadow-md rounded-md">
      <h1 className="bg-olive-300 p-3 rounded-ss-md rounded-se-md shadow-md border-b">
        Fragments
      </h1>
      <ul className="flex flex-col gap-2 w-full min-h-0 overflow-y-auto p-1 px-2">
        {data.map((fragment: Fragment) => (
          <li key={fragment.id}>
            <FragmentCard
              id={fragment.id}
              Snippet={fragment.Snippet}
              Type={fragment.Type}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
