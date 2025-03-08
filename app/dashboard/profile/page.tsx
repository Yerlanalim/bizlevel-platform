'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { User } from '@supabase/supabase-js'
import { Star, Medal, Trophy, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Тип для профиля пользователя
type Profile = {
  id: string;
  full_name?: string;
  role?: string;
  business_info?: {
    type: string;
    employees: number;
    revenue: string;
  };
  goals?: string[];
  skills?: string[];
  level_progress?: {
    completed: number;
    total: number;
  };
  achievements?: {
    title: string;
    icon: string;
  }[];
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        
        // Получаем данные профиля из таблицы profiles
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        // Если профиль существует, используем его данные
        // Иначе создаем тестовый профиль
        if (profileData) {
          setProfile(profileData)
        } else {
          setProfile({
            id: user.id,
            full_name: 'Иван Иванов',
            role: 'Ambitious',
            business_info: {
              type: 'Пекарня',
              employees: 5,
              revenue: '10млн тг/мес'
            },
            goals: [
              'Выйти в стабильную прибыль',
              'Завершить заполнение Бизнес профиля'
            ],
            skills: [
              'Личные навыки и развитие',
              'Управление и планирование',
              'Нетворкинг и связи',
              'Работа с клиентами и продажи',
              'Финансовое управление',
              'Бухгалтерские и юр-е вопросы'
            ],
            level_progress: {
              completed: 9,
              total: 10
            },
            achievements: [
              { title: 'Star Performer', icon: '⭐' },
              { title: 'Silver Medalist', icon: '🏅' }
            ]
          })
        }
      }
      
      setLoading(false)
    }
    
    getUser()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      {/* Шапка с навигацией */}
      <div className="flex justify-between items-center mb-5">
        <div className="text-xl font-bold text-teal-600">BizLevel</div>
        <nav className="flex space-x-4">
          <Link href="/dashboard/profile" className="text-teal-600 hover:text-teal-800">
            В Профиль
          </Link>
          <Link href="/dashboard/artifacts" className="text-teal-600 hover:text-teal-800">
            В Артефакты
          </Link>
          <Link href="/dashboard/chat" className="text-gray-600 hover:text-gray-800">
            Чат
          </Link>
        </nav>
      </div>

      {/* Заголовок профиля */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{profile?.full_name}</h1>
        <p className="text-gray-600">{profile?.role}</p>
      </div>

      {/* Бизнес-информация */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Информация о бизнесе</h2>
        <p className="text-gray-700">
          {profile?.business_info?.type}, {profile?.business_info?.employees} сотрудников, 
          выручка - {profile?.business_info?.revenue}
        </p>
        <div className="mt-4">
          <p className="text-gray-600 font-medium">Основные цели:</p>
          <ul className="mt-2 space-y-1 text-gray-600 italic">
            {profile?.goals?.map((goal, index) => (
              <li key={index}>{index + 1}. {goal}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Секция навыков */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-teal-50 p-6 rounded-lg">
          <h3 className="font-semibold text-teal-800 mb-4">Навыки</h3>
          <ul className="space-y-2">
            {profile?.skills?.map((skill, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <ChevronRight className="h-4 w-4 text-teal-500 mr-2" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Прогресс */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Прогресс</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${(profile?.level_progress?.completed || 0) / (profile?.level_progress?.total || 1) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-700 text-sm">
          Вы прошли {profile?.level_progress?.completed} уровней из {profile?.level_progress?.total} доступных
        </p>
      </div>

      {/* Достижения */}
      <div className="flex justify-around mb-6">
        {profile?.achievements?.map((achievement, index) => (
          <div key={index} className="text-center">
            <span className="block text-2xl mb-2">{achievement.icon}</span>
            <p className="text-gray-700">{achievement.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
