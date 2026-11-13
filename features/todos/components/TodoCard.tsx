import { useUpdateTodo } from '../hooks/useTodos';
import type { TodoCardProps } from '../types';

export function TodoCard(props: TodoCardProps) {
  const { mutate, isPending } = useUpdateTodo();

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
        checked={props.Status}
        disabled={isPending}
        onChange={(event) => {
          mutate({
            id: props.id,
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
          ${status ? 'text-muted-foreground line-through' : ''}
        `}
      >
        {props.Task}
      </span>
    </label>
  );
}
