import 'server-only';

import { notion } from './client';
import { requireAuth } from '../auth/require-auth';

export type CreateMoneyTrackingInput = {
  product: string;
  date: string;
  idr: number;
  imageFileUploadId?: string;
  imageName?: string;
};

export async function createMoneyTracking(input: CreateMoneyTrackingInput) {
  await requireAuth();
  
  const dataSourceId = process.env.NOTION_MONEYTRACKING_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error('NOTION_MONEYTRACKING_DATA_SOURCE_ID is not configured.');
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
              content: input.product,
            },
          },
        ],
      },

      Date: {
        date: {
          start: input.date,
        },
      },

      IDR: {
        number: input.idr,
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
