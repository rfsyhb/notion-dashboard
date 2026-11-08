import 'server-only';

import { notion } from './client';
import { requireAuth } from '../auth/require-auth';
import { DailyTask } from '../dailytask';

export type CreateExpensesInput = {
  product: string;
  date: string;
  idr: number;
  imageFileUploadId?: string;
  imageName?: string;
};

export async function createExpenses(input: CreateExpensesInput) {
  await requireAuth();

  const dataSourceId = process.env.NOTION_EXPENSES_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error('NOTION_EXPENSES_DATA_SOURCE_ID is not configured.');
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

export type CreateTodosInput = {
  task: string;
};

export async function createTodos(input: CreateTodosInput) {
  await requireAuth();

  const dataSourceId = process.env.NOTION_TODOS_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error('NOTION_TODOS_DATA_SOURCE_ID is not configured.');
  }

  return notion.pages.create({
    parent: {
      type: 'data_source_id',
      data_source_id: dataSourceId,
    },

    properties: {
      Task: {
        title: [
          {
            type: 'text',
            text: {
              content: input.task,
            },
          },
        ],
      },
    },
  });
}

export async function createDailyTask() {
  await requireAuth();

  const dataSourceId = process.env.NOTION_DAILYTASK_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error('NOTION_DAILYTASK_DATA_SOURCE_ID is not configured.');
  }

  return notion.pages.create({
    parent: {
      type: 'data_source_id',
      data_source_id: dataSourceId,
    },

    properties: {
      'Wake up at': {
        title: [
          {
            type: 'text',
            text: {
              content: '',
            },
          },
        ],
      },
      Date: {
        date: {
          start: new Date().toISOString().split('T')[0], // ex "2026-09-24"
        },
      }
    },
  });
}

export type UpdateDailyTaskInput = Omit<
  DailyTask,
  'Date' | 'Wake up at' | 'Read 15 min' | 'Treadmill 20 min' | 'Drink 3 litre'
> & {
  'Wake up at'?: string;
  'Read 15 min'?: boolean;
  'Treadmill 20 min'?: boolean;
  'Drink 3 litre'?: boolean;
};
export async function updateDailyTask(input: UpdateDailyTaskInput) {
  await requireAuth();

  const dataSourceId = process.env.NOTION_DAILYTASK_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error('NOTION_DAILYTASK_DATA_SOURCE_ID is not configured.');
  }

  return notion.pages.update({
    page_id: input.id,
    properties: {
      ...(input['Wake up at'] !== undefined && {
        'Wake up at': {
          title: [
            {
              type: 'text',
              text: {
                content: input['Wake up at'],
              },
            },
          ],
        },
      }),
      ...(input['Read 15 min'] !== undefined && {
        'Read 15 min': {
          checkbox: input['Read 15 min'],
        },
      }),
      ...(input['Treadmill 20 min'] !== undefined && {
        'Treadmill 20 min': {
          checkbox: input['Treadmill 20 min'],
        },
      }),
      ...(input['Drink 3 litre'] !== undefined && {
        'Drink 3 litre': {
          checkbox: input['Drink 3 litre'],
        },
      }),
    },
  });
}
