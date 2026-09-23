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
    <form onSubmit={handleSubmit} className="fixed bottom-4 right-4">
      <input
        type="password"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="Access code"
      />

      <button type="submit" disabled={unlockMutation.isPending}>
        {unlockMutation.isPending ? 'Unlocking...' : 'Unlock'}
      </button>

      {unlockMutation.isError && <p>{unlockMutation.error.message}</p>}
    </form>
  );
}
