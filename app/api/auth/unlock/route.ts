import { cookies } from 'next/headers';
import { success, z } from 'zod';

import { createSessionToken } from '@/lib/auth/session';

const schema = z.object({
  code: z.string().min(1, 'Code wajib diisi'),
});

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        message: 'Invalid request body',
      },
      {
        status: 400,
      },
    );
  }

  if (parsed.data.code !== process.env.DASHBOARD_ACCESS_CODE) {
    return Response.json(
      {
        message: 'Invalid access code',
      },
      {
        status: 401,
      },
    );
  }

  const token = await createSessionToken();

  const cookieStore = await cookies();

  cookieStore.set('dashboard_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 1,
  });

  return Response.json({
    success: true,
  });
}
