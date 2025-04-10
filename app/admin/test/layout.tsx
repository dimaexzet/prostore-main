'use client';

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Простой layout для тестовых страниц, без проверки роли
  return (
    <div className="p-4">
      <div className="bg-yellow-100 p-4 rounded mb-4 border border-yellow-400">
        <h2 className="text-lg font-bold text-yellow-800">🧪 Тестовый режим</h2>
        <p className="text-yellow-700">Этот раздел используется для диагностики навигации в админке.</p>
      </div>
      
      {children}
    </div>
  );
} 