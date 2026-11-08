export type DailyTask = {
  id: string;
  'Wake up at': string; // title, time ex: "05:42" 24 hour format
  Date: string;
  'Read 15 min': boolean;
  'Treadmill 20 min': boolean;
  'Drink 3 litre': boolean;
};

export type GetDailyTaskPayload = {
  data: DailyTask[];
  nextCursor: null | string;
  hasMore: boolean;
};

export async function getDailyTasks(): Promise<GetDailyTaskPayload> {
  const response = await fetch('/api/dailytask');

  if (!response.ok) {
    throw new Error('Failed to fetch daily tasks');
  }

  return response.json();
}
