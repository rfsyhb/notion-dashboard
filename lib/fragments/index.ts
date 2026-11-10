export type Fragment = {
  id: string;
  Snippet: string;
  Type: 'Fact' | 'Insight' | 'Aphorism' | 'Principle';
};

export type GetFragmentsPayload = {
  data: Fragment[];
  nextCursor: null | string;
  hasMore: boolean;
};

export async function getFragments(): Promise<GetFragmentsPayload> {
  const response = await fetch('/api/fragments');

  if (!response.ok) {
    throw new Error('Failed to fetch fragments');
  }

  return response.json();
}
