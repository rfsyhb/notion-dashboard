export type Fragment = {
  id: string;
  Snippet: string;
  Type: 'Fact' | 'Insight' | 'Aphorism' | 'Principle';
};

export type CreateFragmentInput = Omit<Fragment, 'id'>;

export type GetFragmentsPayload = {
  data: Fragment[];
  nextCursor: null | string;
  hasMore: boolean;
};
