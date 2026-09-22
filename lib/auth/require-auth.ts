import 'server-only';

import { cookies } from 'next/headers';

import { verifySessionToken } from './session';

export async function requireAuth() {
  const cookieStore = await cookies();

  const token = cookieStore.get('dashboard_session')?.value;

  if (!token) {
    throw new Error('Unauthorized');
  }

  const authorized = await verifySessionToken(token);

  if (!authorized) {
    throw new Error('Unauthorized');
  }
}
