import { mapFragmentItem } from '@/features/fragments/mapper';
import { createFragments } from '@/features/fragments/mutations';
import { queryDataSource } from '@/lib/notion/queries';
import { isFullPage } from '@notionhq/client';

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

    const data = await queryDataSource(dataSourceId, {
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    const mappedData = data.data.filter(isFullPage).map(mapFragmentItem);

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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const snippet = formData.get('snippet') as string;
    const type = formData.get('type') as
      | 'Fact'
      | 'Insight'
      | 'Aphorism'
      | 'Principle';

    if (typeof snippet !== 'string') {
      return Response.json(
        {
          message: 'Invalid input data for snippet',
        },
        {
          status: 400,
        },
      );
    }
    if (typeof type !== 'string') {
      return Response.json(
        {
          message: 'Invalid input data for snippet',
        },
        {
          status: 400,
        },
      );
    }

    const page = await createFragments({
      Snippet: snippet,
      Type: type,
    });

    if (!isFullPage(page)) {
      throw new Error('Create page is not a full page');
    }

    return Response.json(
      {
        data: mapFragmentItem(page),
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: 'Failed to create fragment entry.',
      },
      {
        status: 500,
      },
    );
  }
}
