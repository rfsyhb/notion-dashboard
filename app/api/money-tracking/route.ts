import { isFullPage } from '@notionhq/client';

import { queryDataSource } from '@/lib/notion/queries';
import { mapMoneyTracking } from '@/lib/notion/mapper';
import { createMoneyTracking } from '@/lib/notion/mutations';
import { uploadFileToNotion } from '@/lib/notion/upload';

export async function GET() {
  try {
    const dataSourceId = process.env.NOTION_MONEYTRACKING_DATA_SOURCE_ID;

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
    const mappedData = data.data.map(mapMoneyTracking);

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

    const product = formData.get('product') as string;
    const date = formData.get('date') as string;
    const idr = formData.get('idr') as string;
    const image = formData.get('image') as File | null;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    if (image instanceof File && image.size > MAX_FILE_SIZE) {
      return Response.json(
        {
          message: 'File size exceeds the maximum limit of 5MB.',
        },
        {
          status: 400,
        },
      );
    }

    if (
      typeof product !== 'string' ||
      typeof date !== 'string' ||
      typeof idr !== 'string'
    ) {
      return Response.json(
        {
          message: 'Invalid input data.',
        },
        {
          status: 400,
        },
      );
    }

    let imageFileUploadId: string | undefined;
    let imageName: string | undefined;

    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith('image/')) {
        return Response.json(
          {
            message: 'Invalid file type. Please upload an image.',
          },
          {
            status: 400,
          },
        );
      }

      const uploadedFile = await uploadFileToNotion(image);
      imageFileUploadId = uploadedFile.id;
      imageName = image.name;
    }

    const page = await createMoneyTracking({
      product,
      date,
      idr: Number(idr),
      imageFileUploadId,
      imageName,
    });

    if (!isFullPage(page)) {
      throw new Error('Created page is not a full page');
    }

    return Response.json(
      {
        data: mapMoneyTracking(page),
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: 'Failed to create money tracking entry.',
      },
      {
        status: 500,
      },
    );
  }
}
