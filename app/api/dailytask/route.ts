import { queryDataSource } from '@/lib/notion/queries';
import { createDailyTask } from '@/lib/notion/mutations';
import { mapDailyTaskItem } from '@/lib/notion/mapper';

export async function GET() {
  try {
    const dataSourceId = process.env.NOTION_DAILYTASK_DATA_SOURCE_ID;

    if (!dataSourceId) {
      return Response.json(
        {
          message: 'Data source ID is not configured.',
        },
        {
          status: 500,
        },
      );
    }

    const data = await queryDataSource(dataSourceId);
    console

    // check if today's date is in the data, if not create a new page for today's date
    const now = new Date();
    const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; // ex "2026-09-24"
    const todayTask = data.data.find(
      (task) =>
        task.object === 'page' &&
        task.properties?.Date?.type === 'date' &&
        task.properties.Date.date?.start === currentDate,
    );

    if (!todayTask) {
      const dailyTask = await createDailyTask();
      data.data.push(dailyTask); // add the newly created daily task to the data array
    }

    const mappedData = data.data.map(mapDailyTaskItem);

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
