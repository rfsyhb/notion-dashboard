import type { PageObjectResponse } from '@notionhq/client';
import type { Fragment } from './types';

export function mapFragmentItem(page: PageObjectResponse): Fragment {
  const snippet = page.properties['Snippet'];
  const type = page.properties['Type'];

  return {
    id: page.id,
    Snippet:
      snippet?.type === 'title' ? (snippet.title[0]?.plain_text ?? '') : '',
    Type:
      type?.type === 'select'
        ? (type.select?.name as Fragment['Type'])
        : 'Fact',
  };
}
