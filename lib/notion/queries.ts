import 'server-only';

import { notion } from './client';

type QueryDataSourceOptions = {
  filter?: Parameters<typeof notion.dataSources.query>[0]['filter'];
};

export async function queryDataSource(
  dataSourceId: string,
  options: QueryDataSourceOptions = {},
) {
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    page_size: 100,
    filter: options.filter,
  });

  return {
    data: response.results,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
}
