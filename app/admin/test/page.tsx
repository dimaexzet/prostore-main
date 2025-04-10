'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const router = useRouter();

  // Тестирование программной навигации
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    router.push(path);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Тестовая Страница Админки</h1>
      
      <div className="p-4 border rounded bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Статус страницы:</h2>
        <p>Если вы видите эту страницу, маршрутизация работает корректно.</p>
      </div>

      <div className="space-y-4 p-4 border rounded bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Тест динамических маршрутов:</h2>
        <p className="text-sm text-gray-500 mb-4">Эти ссылки используют динамические сегменты маршрута (подобно Edit/Details в админке)</p>
        
        <div className="flex gap-2">
          <Button asChild variant="default">
            <Link href="/admin/test/123">Тестовый ID: 123</Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/admin/test/abc">Тестовый ID: abc</Link>
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleNavigation('/admin/test/xyz')}
          >
            router.push: xyz
          </Button>
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Тест кнопок навигации:</h2>

        <div className="space-y-2">
          <h3 className="font-medium">1. Используя Link (как в оригинальном коде):</h3>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/products">К списку продуктов</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/admin/products/create`}>Создать продукт</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/admin/orders`}>К заказам</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="font-medium">2. Используя router.push (программная навигация):</h3>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              onClick={() => handleNavigation('/admin/products')}
            >
              К списку продуктов
            </Button>
            <Button 
              variant="default"
              onClick={() => handleNavigation('/admin/products/create')}
            >
              Создать продукт
            </Button>
            <Button 
              variant="default"
              onClick={() => handleNavigation('/admin/orders')}
            >
              К заказам
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="font-medium">3. Тест обычных ссылок:</h3>
          <div className="flex gap-2">
            <Link href="/admin/products" className="text-blue-500 underline">
              К списку продуктов
            </Link>
            <Link href="/admin/products/create" className="text-blue-500 underline">
              Создать продукт
            </Link>
            <Link href="/admin/orders" className="text-blue-500 underline">
              К заказам
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 