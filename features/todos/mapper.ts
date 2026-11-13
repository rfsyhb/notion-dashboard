import type { PageObjectResponse } from '@notionhq/client';
import type { Todo } from './types';

export function mapTodoItem(page: PageObjectResponse): Todo {
  const task = page.properties['Task'];
  const status = page.properties['Status'];
  const createdTime = page.properties['Created time'];

  return {
    id: page.id,
    Task: task?.type === 'title' ? (task.title[0]?.plain_text ?? '') : '',
    Status: status?.type === 'checkbox' ? (status?.checkbox ?? false) : false,
    'Created time':
      createdTime.type === 'created_time'
        ? (createdTime?.created_time ?? '')
        : '',
  };
}
