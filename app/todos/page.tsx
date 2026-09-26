'use client';

import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { getAuthStatus } from '@/lib/auth/auth';

const formSchema = z.object({
  task: z.string().min(1, 'Task title wajib diisi'),
});

export default function TodoPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthStatus,
  });

  if (authQuery.isPending) {
    return null;
  }

  if (authQuery.data?.authenticated !== true) {
    return (
      <p className="w-full h-screen flex items-center justify-center">
        unauthorized!
      </p>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = formSchema.safeParse({
      task: formData.get('task'),
    });

    if (!result.success) {
      setMessage(result.error.issues.map((issue) => issue.message).join(', '));

      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const requestFormData = new FormData();

      requestFormData.append('task', result.data.task);

      const response = await fetch('/api/todos', {
        method: 'POST',
        body: requestFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Request failed');
      }

      form.reset();

      setMessage('todo added!');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen p-8 items-center justify-center flex">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Task</label>

          <input
            type="text"
            name="task"
            className="w-full rounded border p-2"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50 hover:cursor-pointer hover:bg-foreground/90"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {message && <p className="text-sm">{message}</p>}
        </div>
      </form>
    </main>
  );
}
