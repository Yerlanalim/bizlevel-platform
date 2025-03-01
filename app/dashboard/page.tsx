'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

// Определяем тип для пользователя
type User = {
  id: string;
  email: string;
  role?: string;
  created_at?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({
          id: user.id,
          email: user.email || '',
          role: user.role,
          created_at: user.created_at
        })
      }
    }
    getUser()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Добро пожаловать в BizLevel!</h1>
      {user && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Информация о пользователе</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">ID:</span> {user.id}</p>
            {user.role && <p><span className="font-medium">Роль:</span> {user.role}</p>}
            {user.created_at && (
              <p>
                <span className="font-medium">Дата регистрации:</span>{' '}
                {new Date(user.created_at).toLocaleDateString('ru-RU')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 