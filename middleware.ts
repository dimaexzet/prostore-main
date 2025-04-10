import { NextRequest, NextResponse } from 'next/server';

// Generate UUID compatible with Edge Runtime
function generateUUID() {
  // Generate random values
  const randomValues = new Uint8Array(16);
  crypto.getRandomValues(randomValues);
  
  // Set version (v4)
  randomValues[6] = (randomValues[6] & 0x0f) | 0x40;
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80;
  
  // Convert to hex string
  let uuid = '';
  for (let i = 0; i < 16; i++) {
    uuid += randomValues[i].toString(16).padStart(2, '0');
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      uuid += '-';
    }
  }
  
  return uuid;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Исключаем маршруты админки и страниц товаров из обработки middleware
  // Используем более широкий паттерн, чтобы захватить также подмаршруты с ID
  if (pathname.startsWith('/admin') || pathname.startsWith('/product')) {
    return NextResponse.next();
  }
  
  // Проверить и создать sessionCartId если его нет
  if (!request.cookies.get('sessionCartId')) {
    const sessionCartId = generateUUID();
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
