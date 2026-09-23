export type AuthStatus = {
  authenticated: boolean;
};

export async function getAuthStatus(): Promise<AuthStatus> {
  const response = await fetch('/api/auth/status');

  if (!response.ok) {
    throw new Error('Failed to check authentication');
  }

  return response.json();
}

export async function unlockUser(code: string) {
  const response = await fetch('/api/auth/unlock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
    }),
  });

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.message ?? 'Invalid access code');
  }

  return response.json();
}
