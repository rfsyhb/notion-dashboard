export function mapFragmentItem(page: any) {
  return {
    id: page.id,
    Snippet: page.properties['Snippet']?.title[0]?.plain_text || '',
    Type: page.properties['Type']?.select.name || '',
  };
}
