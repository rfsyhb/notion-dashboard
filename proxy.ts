import { NextRequest, NextResponse } from 'next/server';

import { verifySessionToken } from './lib/auth/session';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isMoneyTracking = pathname.startsWith('/api/money-tracking');

  const isMutation =
    request.method === 'POST' ||
    request.method === 'PUT' ||
    request.method === 'PATCH' ||
    request.method === 'DELETE';

  if (!isMoneyTracking || !isMutation) {
    return NextResponse.next();
  }

  const token = request.cookies.get('dashboard_session')?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  const unauthorized = await verifySessionToken(token);

  if (!unauthorized) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/money-tracking/:path*'],
};
