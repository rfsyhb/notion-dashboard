'use client';

import { z } from 'zod';
import { getAuthStatus } from '@/lib/auth/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { FRAGMENTS_QUERY_KEY } from '@/lib/hooks/useFragments';

const formSchema = z.object({
  snippets: z.string().min(1, 'Snippets wajib diisi'),
  type: z
    .string()
    .refine(
      (value) => ['Fact', 'Insight', 'Aphorism', 'Principle'].includes(value),
      {
        message: 'Type tidak valid',
      },
    ),
});

export default function FragmentsPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

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
      snippets: formData.get('snippets'),
      type: formData.get('type'),
    });

    if (!result.success) {
      setMessage(result.error.issues.map((issue) => issue.message).join(', '));

      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const requestFormData = new FormData();

      requestFormData.append('snippet', result.data.snippets);
      requestFormData.append('type', result.data.type);

      const response = await fetch('/api/fragments', {
        method: 'POST',
        body: requestFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      form.reset();
      queryClient.invalidateQueries({
        queryKey: FRAGMENTS_QUERY_KEY,
      });

      setMessage('fragment added!');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-4 rounded"
      >
        <h1 className="text-2xl font-bold">Add Fragment</h1>
        <textarea
          name="snippets"
          placeholder="Enter snippets"
          className="w-full p-2 border rounded"
          rows={4}
        />
        <select name="type" className="w-full p-2 border rounded">
          <option value="">Select type</option>
          <option value="Fact">Fact</option>
          <option value="Insight">Insight</option>
          <option value="Aphorism">Aphorism</option>
          <option value="Principle">Principle</option>
        </select>
        <div className="flex flex-row gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-black flex-2 cursor-pointer hover:bg-foreground/90 text-white p-2 rounded disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Fragment'}
          </button>
          <div className='flex-2'>{message && <p className="text-sm">{message}</p>}</div>
        </div>
      </form>
    </main>
  );
}
