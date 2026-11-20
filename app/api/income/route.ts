import { requireAuth } from '@/lib/auth/require-auth';

export async function GET() {
  await requireAuth();

  const income = Number(process.env.MONTHLY_INCOME);

  return Response.json({ income });
}
