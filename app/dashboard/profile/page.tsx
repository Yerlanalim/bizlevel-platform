'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { User } from '@supabase/supabase-js'
import { Mail, User as UserIcon, Calendar, Bell, Shield, Award, BookOpen, Clock } from 'lucide-react'
import Image from 'next/image'

// Тип для профиля пользователя
type Profile = {
  id: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  bio?: string;
  company?: string;
  position?: string;
  completed_lessons?: number;
  total_hours?: number;
  joined_at?: string;
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
        // Иначе создаем базовый профиль
        if (profileData) {
          setProfile(profileData)
        } else {
          setProfile({
            id: user.id,
            full_name: 'Пользователь',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250',
            role: 'user',
            completed_lessons: 1,
            total_hours: 2,
            joined_at: new Date().toISOString()
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4">Загрузка профиля...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Профиль</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Левая колонка - основная информация */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                {profile?.avatar_url ? (
                  <Image 
                    src={profile.avatar_url} 
                    alt="Аватар пользователя"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <UserIcon size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold">{profile?.full_name || user?.email?.split('@')[0]}</h2>
              <p className="text-gray-500 mt-1">{profile?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
              
              <div className="mt-4 w-full">
                <button className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors">
                  Редактировать профиль
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-2" />
                  <span>{user?.email}</span>
                </div>
                {profile?.company && (
                  <div className="flex items-center text-gray-600">
                    <Shield size={18} className="mr-2" />
                    <span>{profile.company}</span>
                  </div>
                )}
                {profile?.position && (
                  <div className="flex items-center text-gray-600">
                    <Award size={18} className="mr-2" />
                    <span>{profile.position}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>Присоединился: {profile?.joined_at ? new Date(profile.joined_at).toLocaleDateString() : 'Недавно'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Правая колонка - статистика и настройки */}
        <div className="md:col-span-2">
          {/* Статистика */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Статистика обучения</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <BookOpen size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Пройдено уроков</p>
                    <p className="text-2xl font-semibold">{profile?.completed_lessons || 0} из 10</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <Clock size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Часов обучения</p>
                    <p className="text-2xl font-semibold">{profile?.total_hours || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Прогресс */}
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Общий прогресс</span>
                <span className="text-sm font-medium text-teal-600">{profile?.completed_lessons ? Math.round((profile.completed_lessons / 10) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-teal-500 h-2.5 rounded-full" 
                  style={{ width: `${profile?.completed_lessons ? Math.round((profile.completed_lessons / 10) * 100) : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Настройки */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Настройки уведомлений</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={18} className="mr-2 text-gray-500" />
                  <label htmlFor="emailNotifications" className="text-gray-700">
                    Уведомления по email
                  </label>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="emailNotifications" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label 
                    htmlFor="emailNotifications" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={18} className="mr-2 text-gray-500" />
                  <label htmlFor="progressUpdates" className="text-gray-700">
                    Уведомления о прогрессе
                  </label>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="progressUpdates" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label 
                    htmlFor="progressUpdates" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                onClick={() => {
                  // В реальном приложении здесь будет сохранение настроек
                  alert('Настройки сохранены!')
                }}
              >
                Сохранить настройки
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
