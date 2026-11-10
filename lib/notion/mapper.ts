export function mapExpensesItem(page: any) {
  return {
    id: page.id,
    Product: page.properties['Product']?.title[0]?.plain_text || '',
    Date: page.properties['Date']?.date?.start || '',
    IDR: page.properties['IDR']?.number || 0,
    // "Image": page.properties["Image"]?.files[0]?.file?.url || "",
  };
}

export function mapTodosItem(page: any) {
  return {
    id: page.id,
    Task: page.properties['Task']?.title[0]?.plain_text || '',
    Status: page.properties['Status']?.checkbox || false,
    'Created time': page.properties['Created time']?.created_time || '',
  };
}

export function mapDailyTaskItem(page: any) {
  return {
    id: page.id,
    'Wake up at': page.properties['Wake up at']?.title[0]?.plain_text || '',
    'Make bed': page.properties['Make bed']?.checkbox || false,
    Date: page.properties['Date']?.date?.start || '',
    'Read 15 min': page.properties['Read 15 min']?.checkbox || false,
    'Treadmill 20 min': page.properties['Treadmill 20 min']?.checkbox || false,
    'Drink 3 litre': page.properties['Drink 3 litre']?.checkbox || false,
    Creatine: page.properties['Creatine']?.checkbox || false,
    Yogurt: page.properties['Yogurt']?.checkbox || false,
    'Fish oil': page.properties['Fish oil']?.checkbox || false,
    Weight: page.properties['Weight']?.rich_text[0]?.plain_text || '',
    'Blood pressure':
      page.properties['Blood pressure']?.rich_text[0]?.plain_text || '',
  };
}

export function mapFragmentItem(page: any) {
  return {
    id: page.id,
    Snippet: page.properties['Snippet']?.title[0]?.plain_text || '',
    Type: page.properties['Type']?.select.name || '',
  };
}
