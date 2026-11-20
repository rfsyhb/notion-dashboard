import { requireAuth } from '@/lib/auth/require-auth';

export async function GET() {
  await requireAuth();
  console.log('getting income');
  console.log(process.env.MONTHLY_INCOME);

  const income = process.env.MONTHLY_INCOME;

  return Response.json({ income });
}
