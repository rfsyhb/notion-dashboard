'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { getAuthStatus, unlockUser } from '@/lib/auth/auth';

export default function UnlockUser() {
  const [code, setCode] = useState('');

  const queryClient = useQueryClient();

  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthStatus,
  });

  const unlockMutation = useMutation({
    mutationFn: unlockUser,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['auth'],
      });

      setCode('');
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    unlockMutation.mutate(code);
  }

  if (authQuery.isPending) {
    return null;
  }

  if (authQuery.data?.authenticated) {
    return (
      <p className="font-light text-sm bottom-4 right-4 fixed">
        authenticated!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-4 right-4 flex flex-row gap-1"
    >
      <input
        type="password"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        className="px-1 max-w-40"
      />

      <button
        type="submit"
        disabled={unlockMutation.isPending}
        className="px-2 hover:cursor-pointer border border-foreground rounded-sm hover:shadow-md"
      >
        {unlockMutation.isPending ? 'unlocking...' : 'unlock'}
      </button>

      {unlockMutation.isError && <p>{unlockMutation.error.message}</p>}
    </form>
  );
}
