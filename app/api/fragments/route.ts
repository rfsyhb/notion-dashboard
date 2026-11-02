import { queryDataSource } from '@/lib/notion/queries';

export async function GET() {
  try {
    const dataSourceId = process.env.NOTION_FRAGMENTS_DATA_SOURCE_ID;

    if (!dataSourceId) {
      return Response.json(
        {
          message: 'Data source ID is not configured',
        },
        {
          status: 500,
        },
      );
    }

    const data = await queryDataSource(dataSourceId);

    return Response.json({
      ...data,
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
