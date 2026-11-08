import { useDailyTask } from '@/lib/hooks/useDailyTask';
import { DailyTaskInput } from './DailyTaskInput';
import { DailyTaskCheckbox } from './DailyTaskCheckbox';

export function DailyTask() {
  const { data, isPending, isError } = useDailyTask();
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Failed to load daily tasks</p>;

  return (
    <div className="flex flex-col gap-2 max-w-60">
      <DailyTaskInput
        key={`${data.id}-${data['Wake up at']}`}
        id={data.id}
        task="Wake up at"
        value={data['Wake up at']}
      />
      <DailyTaskCheckbox
        key={`${data.id}-${data['Read 15 min']}-read`}
        id={data.id}
        task="Read 15 min"
        checked={data['Read 15 min']}
      />
      <DailyTaskCheckbox
        key={`${data.id}-${data['Treadmill 20 min']}-treadmill`}
        id={data.id}
        task="Treadmill 20 min"
        checked={data['Treadmill 20 min']}
      />
      <DailyTaskCheckbox
        key={`${data.id}-${data['Drink 3 litre']}-drink`}
        id={data.id}
        task="Drink 3 litre"
        checked={data['Drink 3 litre']}
      />
    </div>
  );
}
