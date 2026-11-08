'use client';

import { useUpdateDailyTask } from '@/lib/hooks/useDailyTask';

type CheckboxTaskKey = 'Read 15 min' | 'Treadmill 20 min' | 'Drink 3 litre';

type DailyTaskCheckboxProps = {
  id: string;
  task: CheckboxTaskKey;
  checked: boolean;
};

export function DailyTaskCheckbox({
  id,
  task,
  checked,
}: DailyTaskCheckboxProps) {
  const { mutate, isPending } = useUpdateDailyTask();

  return (
    <label
      className={`
        inline-flex w-fit cursor-pointer items-center gap-2
        transition-opacity duration-200
        ${isPending ? 'opacity-50' : ''}
      `}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={isPending}
        onChange={(event) => {
          mutate({
            id,
            [task]: event.target.checked,
          });
        }}
        className="
          size-[1em]
          shrink-0
          cursor-pointer
          accent-emerald-500
          transition-all duration-200
          disabled:cursor-wait
        "
      />

      <span
        className={`
          select-none transition-all duration-200
          ${checked ? 'text-muted-foreground line-through' : ''}
        `}
      >
        {task}
      </span>
    </label>
  );
}
