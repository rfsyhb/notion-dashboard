import { requireAuth } from '@/lib/auth/require-auth';
import { CreateTodoInput, UpdateTodoInput } from './types';
import { notion } from '@/lib/notion/client';
import { updatePage } from '@/lib/notion/mutations';

export async function createTodos(input: CreateTodoInput) {
  await requireAuth();

  const dataSourceId = process.env.NOTION_TODOS_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error('TODOS: data source id is not configured.');
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
              content: input.Task,
            },
          },
        ],
      },
    },
  });
}

export async function updateTodo(input: UpdateTodoInput) {
  await requireAuth();

  return updatePage(input.id, {
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
  });
}
