import {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

import {jwtVerify} from 'jose';

export async function middleware(req: NextRequest) {
  if (process.env.ACCESS_CONTROL_ENABLED !== 'true') {
    console.log('Access control is disabled, allowing request');
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === '/entry') {
    return NextResponse.next();
  }

  const token = req.cookies.get('control_token');

  if (!token) {
    return NextResponse.redirect(new URL('/entry', req.url));
  }

  try {
    await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.CONTROL_JWT_SECRET)
    );
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/entry', req.url));
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|entry).*)'],
};
