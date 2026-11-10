import type { Fragment } from '@/lib/fragments';

export default function FragmentCard(fragment: Fragment) {
  const typeColors: Record<string, string> = {
    Fact: 'bg-orange-200',
    Insight: 'bg-gray-300',
    Aphorism: 'bg-amber-200',
    Principle: 'bg-slate-400',
  };

  return (
    <div
      className={`p-1 w-full flex border rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
        typeColors[fragment.Type] ?? ''
      }`}
    >
      {fragment.Snippet}
    </div>
  );
}
