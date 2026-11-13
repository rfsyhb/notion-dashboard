import { requireAuth } from '@/lib/auth/require-auth';
import type { InputExpensePayload } from './types';
import { notion } from '@/lib/notion/client';

export async function createExpense(input: InputExpensePayload) {
  await requireAuth();

  const dataSourceId = process.env.NOTION_EXPENSES_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error('Expenses: Data Source ID is not configured.');
  }

  return notion.pages.create({
    parent: {
      type: 'data_source_id',
      data_source_id: dataSourceId,
    },

    properties: {
      Product: {
        title: [
          {
            type: 'text',
            text: {
              content: input.Product,
            },
          },
        ],
      },

      Date: {
        date: {
          start: input.Date,
        },
      },

      IDR: {
        number: input.IDR,
      },

      ...(input.imageFileUploadId && {
        Image: {
          files: [
            {
              type: 'file_upload',
              file_upload: {
                id: input.imageFileUploadId,
              },
              name: input.imageName ?? 'image',
            },
          ],
        },
      }),
    },
  });
}
