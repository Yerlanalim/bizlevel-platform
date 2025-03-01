'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { User } from '@supabase/supabase-js'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Загрузка...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Панель управления</h1>
      
      <div className="w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Добро пожаловать, {user?.user_metadata.email || 'Пользователь'}!</h2>
          <p className="text-gray-600">Выберите раздел для работы:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard/profile" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Профиль</h3>
            <p className="text-gray-600">Управление личными данными</p>
          </Link>
          
          <Link href="/dashboard/map" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow bg-blue-50 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-2">Карта уровней</h3>
            <p className="text-gray-600">Ваш путь обучения</p>
          </Link>
          
          <Link href="/dashboard/lessons" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Уроки</h3>
            <p className="text-gray-600">Доступные уроки и курсы</p>
          </Link>
          
          <Link href="/dashboard/artifacts" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Артефакты</h3>
            <p className="text-gray-600">Ваши бизнес-артефакты</p>
          </Link>
          
          <Link href="/dashboard/chat" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Чат</h3>
            <p className="text-gray-600">Общение с наставником</p>
          </Link>
          
          <Link href="/dashboard/settings" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Настройки</h3>
            <p className="text-gray-600">Настройки аккаунта</p>
          </Link>
        </div>
      </div>
    </div>
  )
} 