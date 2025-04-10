import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Исключаем маршруты админки и страниц товаров из обработки middleware
  // Используем более широкий паттерн, чтобы захватить также подмаршруты с ID
  if (pathname.startsWith('/admin') || pathname.startsWith('/product')) {
    return NextResponse.next();
  }
  
  // Проверить и создать sessionCartId если его нет
  if (!request.cookies.get('sessionCartId')) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.next();
    response.cookies.set('sessionCartId', sessionCartId, {
      // Ensure cookie is sent in all contexts
      secure: true,
      sameSite: 'lax',
      // Set a long expiration for the cart
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return response;
  }
  
  return NextResponse.next();
}

// Настройка маршрутов для middleware - исключаем admin и product из matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - admin (admin routes)
     * - product (product pages)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (images directory)
     */
    '/((?!admin|product|api|_next/static|_next/image|favicon.ico|images).*)'
  ]
};
