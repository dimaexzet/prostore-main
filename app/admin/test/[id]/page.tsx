'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function TestDetailPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Тестовая Страница с Параметром</h1>
      
      <div className="p-4 border rounded bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Информация о маршруте:</h2>
        <p>ID параметр: <strong>{id}</strong></p>
        <p>Если вы видите этот ID, значит динамический маршрут работает правильно</p>
      </div>

      <div className="space-y-4 p-4 border rounded bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Навигация:</h2>
        
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/test">Назад к тестовой странице</Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link href="/admin/products">К списку продуктов</Link>
          </Button>
          
          <Button asChild variant="default">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 