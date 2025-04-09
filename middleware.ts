import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверить и создать sessionCartId если его нет
  if (!request.cookies.get('sessionCartId')) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.next();
    response.cookies.set('sessionCartId', sessionCartId);
    return response;
  }
  
  return NextResponse.next();
}

// Настройка маршрутов для middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (images directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)'
  ]
};
