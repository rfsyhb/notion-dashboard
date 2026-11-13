import type { Fragment } from '../types.ts';

export default function FragmentCard(fragment: Fragment) {
  const typeColors: Record<string, string> = {
    Fact: 'bg-orange-200',
    Insight: 'bg-gray-300',
    Aphorism: 'bg-amber-200',
    Principle: 'bg-slate-400',
  };

  return (
    <div
      className={`relative p-1 w-full flex border rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
        typeColors[fragment.Type] ?? ''
      }`}
    >
      <q className="p-2 pb-3 text-sans">{fragment.Snippet}</q>
      <span className="absolute bottom-0 right-0 text-xs bg-foreground text-background font-semibold pl-3 pr-2 rounded-ss-xl rounded-ee-md">
        {fragment.Type}
      </span>
    </div>
  );
}
