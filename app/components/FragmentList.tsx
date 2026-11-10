import { useFragments } from '@/lib/hooks/useFragments';
import FragmentCard from './FragmentCard';
import { Fragment } from '@/lib/fragments';

export default function FragmentList() {
  const { data, isLoading, isError } = useFragments();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load fragments</p>;

  return (
    <section className='h-full w-full flex'>
      <ul className="flex flex-col gap-3 px-3 w-full min-h-0 overflow-y-auto">
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
