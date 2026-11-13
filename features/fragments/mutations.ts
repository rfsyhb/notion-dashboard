import 'server-only';

import { notion } from '@/lib/notion/client';
import { requireAuth } from '@/lib/auth/require-auth';
import type { CreateFragmentInput } from './types'

export async function createFragments(input: CreateFragmentInput) {
  await requireAuth(); // make sure end user authorized

  const dataSourceId = process.env.NOTION_FRAGMENTS_DATA_SOURCE_ID;
  if (!dataSourceId) {
    throw new Error('Fragments: Data Source ID is not configured.');
  }

  return notion.pages.create({
    parent: {
      type: 'data_source_id',
      data_source_id: dataSourceId,
    },

    properties: {
      Snippet: {
        title: [
          {
            type: 'text',
            text: {
              content: input.Snippet,
            },
          },
        ],
      },
      Type: {
        select: {
          name: input.Type,
        },
      },
    },
  });
}
