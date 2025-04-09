import { auth } from '@/auth';

// Настройка маршрутов для middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - product (страницы продуктов)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (images directory)
     */
    '/((?!product|api|_next/static|_next/image|favicon.ico|images).*)']
};

// Экспортируем auth как middleware
export { auth as middleware };
