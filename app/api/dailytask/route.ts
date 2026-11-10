import { queryDataSource } from '@/lib/notion/queries';
import { createDailyTask, updateDailyTask } from '@/lib/notion/mutations';
import { mapDailyTaskItem } from '@/lib/notion/mapper';

export async function GET() {
  try {
    const dataSourceId = process.env.NOTION_DAILYTASK_DATA_SOURCE_ID;

    if (!dataSourceId) {
      return Response.json(
        { message: 'Data source ID is not configured.' },
        { status: 500 },
      );
    }

    const currentDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

    // Find today's task
    const response = await queryDataSource(dataSourceId, {
      filter: {
        property: 'Date',
        date: {
          equals: currentDate,
        },
      },
    });

    const todayTask = response.data.find((task) => task.object === 'page');

    // Create a new task if today's task doesn't exist
    const dailyTask = todayTask ?? (await createDailyTask(currentDate));

    return Response.json({
      data: mapDailyTaskItem(dailyTask),
      nextCursor: response.nextCursor,
      hasMore: response.hasMore,
    });
  } catch (error) {
    console.error('Error fetching daily task:', error);

    return Response.json(
      { message: 'Failed to fetch daily task.' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const updatedTask = await updateDailyTask(body);

    return Response.json({
      data: mapDailyTaskItem(updatedTask),
    });
  } catch (error) {
    console.error('Error updating daily task:', error);

    return Response.json(
      { message: 'Failed to update daily task.' },
      { status: 500 },
    );
  }
}
