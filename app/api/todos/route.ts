import { mapTodoItem } from '@/features/todos/mapper';
import { createTodos, updateTodo } from '@/features/todos/mutations';
import { queryDataSource } from '@/lib/notion/queries';
import { isFullPage, PageObjectResponse } from '@notionhq/client';

export async function GET() {
  try {
    const dataSourceId = process.env.NOTION_TODOS_DATA_SOURCE_ID;

    if (!dataSourceId) {
      return Response.json(
        {
          message: 'Data source  ID is not configured.',
        },
        {
          status: 500,
        },
      );
    }

    const data = await queryDataSource(dataSourceId, {
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });
    const mappedData = data.data.filter(isFullPage).map(mapTodoItem);

    return Response.json({
      data: mappedData,
      nextCursor: data.nextCursor,
      hasMore: data.hasMore,
    });
  } catch (error) {
    console.error('Error fetching data from Notion:', error);

    return Response.json(
      {
        message: 'Failed to fetch data from Notion.',
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const task = formData.get('task') as string;
    if (typeof task !== 'string') {
      return Response.json(
        {
          message: 'Invalid input data for todo create',
        },
        {
          status: 400,
        },
      );
    }

    const page = await createTodos({
      Task: task,
    });

    if (!isFullPage(page)) {
      throw new Error('Created page is not a full page');
    }

    return Response.json(
      {
        data: mapTodoItem(page),
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: 'Failed to create todo entry.',
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const updatedTask = await updateTodo(body);
    return Response.json({
      data: mapTodoItem(updatedTask as PageObjectResponse),
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: 'Failed to update todo entry.',
      },
      {
        status: 500,
      },
    );
  }
}
