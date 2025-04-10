'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TestDetailPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Тестовая страница с параметрами</h1>
      <div className="text-lg">
        <p>Это страница с динамическим параметром: <strong>{id}</strong></p>
        <p>Страница используется для тестирования динамических маршрутов</p>
      </div>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/admin/test">Вернуться</Link>
        </Button>
      </div>
    </div>
  );
} 