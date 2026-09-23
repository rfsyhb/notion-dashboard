import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();

  const session = cookieStore.get('dashboard_session');

  if (!session) {
    return Response.json({
      authenticated: false,
    });
  }

  // Idealnya verify signature/token di sini.
  const valid = true;

  return Response.json({
    authenticated: valid,
  });
}
