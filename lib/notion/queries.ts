import 'server-only';

import { notion } from './client';

export async function queryDataSource(dataSourceId: string) {
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    page_size: 100,
  });

  return {
    data: response.results,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
}
