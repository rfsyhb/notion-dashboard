import FragmentCard from './FragmentCard';
import { useFragments } from '../hooks/useFragments';
import type { Fragment } from '../types';

export default function FragmentList() {
  const { data, isLoading, isError } = useFragments();

  if (isLoading) return <p>Loading...</p>;

  if (isError && !data) {
    return <p>Failed to load fragments</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

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
