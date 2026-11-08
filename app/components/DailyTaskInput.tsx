'use client';

import { useState } from 'react';
import { useUpdateDailyTask } from '@/lib/hooks/useDailyTask';

type InputTaskKey = 'Wake up at';

type DailyTaskInputProps = {
  id: string;
  task: InputTaskKey;
  value: string;
  placeholder?: string;
};

export function DailyTaskInput({
  id,
  task,
  value,
  placeholder,
}: DailyTaskInputProps) {
  const [input, setInput] = useState(value);
  const { mutate, isPending } = useUpdateDailyTask();

  function handleSave() {
    const newValue = input.trim();

    if (newValue === value || isPending) return;

    mutate(
      {
        id,
        [task]: newValue,
      },
      {
        onError: () => {
          setInput(value);
        },
      },
    );
  }

  return (
    <label className="flex items-center gap-2">
      <span className="whitespace-nowrap">{task}</span>
      <input
        type="text"
        value={input}
        placeholder={placeholder ?? task}
        disabled={isPending}
        onChange={(event) => setInput(event.target.value)}
        onBlur={handleSave}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.currentTarget.blur();
          }
        }}
        className="rounded border px-2 py-1 min-w-0 max-w-max"
      />
    </label>
  );
}
