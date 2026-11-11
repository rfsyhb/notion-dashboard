import { useFragments } from '@/lib/hooks/useFragments';
import FragmentCard from './FragmentCard';
import { Fragment } from '@/lib/fragments';

export default function FragmentList() {
  const { data, isLoading, isError } = useFragments();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load fragments</p>;

  return (
    <section className='h-full w-full flex flex-col bg-olive-200 border shadow-md rounded-lg'>
      <h1 className='bg-olive-300 p-3 rounded-ss-lg rounded-se-lg shadow-md border-b'>Fragments</h1>
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
