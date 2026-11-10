import { useUpdateTodos } from '@/lib/hooks/useTodos';

type TodoTaskProps = {
  id: string;
  task: string;
  checked: boolean;
};

export function TodoTask({ id, task, checked }: TodoTaskProps) {
  const { mutate, isPending } = useUpdateTodos();

  return (
    <label
      className={`
        inline-flex w-fit cursor-pointer items-center gap-2 px-1
        transition-opacity duration-200 text-sm md:text-base
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
            Status: event.target.checked,
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
