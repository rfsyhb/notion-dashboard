'use client';

import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { getToday } from '@/lib/helper';

const formSchema = z.object({
  product: z.string().min(1, 'Product wajib diisi'),
  date: z.string().min(1, 'Date wajib diisi'),

  idr: z.coerce.number().positive('IDR harus lebih dari 0'),

  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: 'Image wajib diisi',
    })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'File harus berupa image',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Ukuran file tidak boleh lebih dari 5MB',
    }),
});

export default function TestPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = formSchema.safeParse({
      product: formData.get('product'),
      date: formData.get('date'),
      idr: formData.get('idr'),
      image: formData.get('image'),
    });

    if (!result.success) {
      setMessage(result.error.issues.map((issue) => issue.message).join(', '));

      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const requestFormData = new FormData();

      requestFormData.append('product', result.data.product);
      requestFormData.append('date', result.data.date);
      requestFormData.append('idr', result.data.idr.toString());
      requestFormData.append('image', result.data.image);

      const response = await fetch('/api/expenses', {
        method: 'POST',
        body: requestFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Request failed');
      }

      setMessage('Data berhasil ditambahkan');

      console.log(data);
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
          <label className="mb-1 block">Product</label>

          <input
            name="product"
            type="text"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Date</label>

          <input
            name="date"
            type="date"
            defaultValue={getToday()}
            className="w-full rounded border p-2 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>

        <div>
          <label className="mb-1 block">IDR</label>

          <input
            name="idr"
            type="number"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Image</label>

          <input
            name="image"
            type="file"
            accept="image/*"
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
