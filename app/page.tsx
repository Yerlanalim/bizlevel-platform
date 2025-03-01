// app/page.tsx
'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6">BizLevel MVP</h1>
      <p className="mb-8">Добро пожаловать на платформу BizLevel!</p>
      
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Навигация</h2>
          <div className="flex flex-col gap-2">
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Вход в систему
            </Link>
            <Link href="/auth/singup" className="text-blue-500 hover:underline">
              Регистрация
            </Link>
            <Link href="/dashboard" className="text-blue-500 hover:underline">
              Дашборд (требуется авторизация)
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
