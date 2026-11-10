import 'server-only';

import { notion } from './client';
import { requireAuth } from '../auth/require-auth';
import { DailyTask } from '../dailytask';
import { Todo } from '../todos';

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

export async function createDailyTask(date: string) {
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
          start: date
        },
      },
    },
  });
}

export type UpdateTodosInput = Omit<Todo, 'Task' | 'Status'> & {
  Task?: string;
  Status?: boolean;
};

export async function updateTodos(input: UpdateTodosInput) {
  await requireAuth();

  return notion.pages.update({
    page_id: input.id,
    properties: {
      ...(input.Task !== undefined && {
        Task: {
          title: [
            {
              type: 'text',
              text: {
                content: input.Task,
              },
            },
          ],
        },
      }),
      ...(input.Status !== undefined && {
        Status: {
        checkbox: input.Status,
        },
      }),
    },
  });
}

export type UpdateDailyTaskInput = Omit<
  DailyTask,
  | 'Date'
  | 'Wake up at'
  | 'Make bed'
  | 'Read 15 min'
  | 'Treadmill 20 min'
  | 'Drink 3 litre'
  | 'Creatine'
  | 'Yogurt'
  | 'Fish oil'
  | 'Weight'
  | 'Blood pressure'
> & {
  'Wake up at'?: string;
  'Make bed'?: boolean;
  'Read 15 min'?: boolean;
  'Treadmill 20 min'?: boolean;
  'Drink 3 litre'?: boolean;
  Creatine?: boolean;
  Yogurt?: boolean;
  'Fish oil'?: boolean;
  Weight?: string;
  'Blood pressure'?: string;
};

export async function updateDailyTask(input: UpdateDailyTaskInput) {
  await requireAuth();

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
      ...(input['Make bed'] !== undefined && {
        'Make bed': {
          checkbox: input['Make bed'],
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
      ...(input.Creatine !== undefined && {
        Creatine: {
          checkbox: input.Creatine,
        },
      }),
      ...(input.Yogurt !== undefined && {
        Yogurt: {
          checkbox: input.Yogurt,
        },
      }),
      ...(input['Fish oil'] !== undefined && {
        'Fish oil': {
          checkbox: input['Fish oil'],
        },
      }),
      ...(input.Weight !== undefined && {
        Weight: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: input.Weight,
              },
            },
          ],
        },
      }),
      ...(input['Blood pressure'] !== undefined && {
        'Blood pressure': {
          rich_text: [
            {
              type: 'text',
              text: {
                content: input['Blood pressure'],
              },
            },
          ],
        },
      }),
    },
  });
}
