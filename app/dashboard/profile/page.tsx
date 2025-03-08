'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { Edit, Phone, Mail, Globe, Info } from 'lucide-react'
import Image from 'next/image'

// Тип для навыка
type Skill = {
  name: string;
  level: number;
  maxLevel: number;
  tooltips: string[];
}

// Тип для достижения
type Achievement = {
  title: string;
  icon: string;
  description: string;
}

// Тип для профиля пользователя
type Profile = {
  id: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  business_info?: {
    type: string;
    employees: number;
    revenue: string;
  };
  goals?: string[];
  skills?: Skill[];
  level_progress?: {
    completed: number;
    total: number;
  };
  achievements?: Achievement[];
  contacts?: {
    phone?: string;
    email?: string;
    social?: string[];
  };
}

// Явный экспорт компонента профиля
export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTooltip, setActiveTooltip] = useState<{skillIndex: number, levelIndex: number} | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
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
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250',
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
              {
                name: 'Личные навыки и развитие',
                level: 7,
                maxLevel: 10,
                tooltips: [
                  'Пройдите тест на определение личностного типа',
                  'Составьте план личного развития',
                  'Изучите основы тайм-менеджмента',
                  'Пройдите курс по эмоциональному интеллекту',
                  'Освойте техники эффективной коммуникации',
                  'Научитесь делегировать задачи',
                  'Развивайте навыки публичных выступлений',
                  'Изучите методы принятия решений',
                  'Освойте техники управления стрессом',
                  'Станьте наставником для других'
                ]
              },
              {
                name: 'Управление и планирование',
                level: 5,
                maxLevel: 10,
                tooltips: [
                  'Составьте бизнес-план',
                  'Определите ключевые показатели эффективности',
                  'Внедрите систему управления проектами',
                  'Научитесь проводить эффективные совещания',
                  'Разработайте стратегию развития бизнеса',
                  'Внедрите систему контроля качества',
                  'Оптимизируйте бизнес-процессы',
                  'Разработайте систему мотивации сотрудников',
                  'Внедрите инновационные методы управления',
                  'Создайте масштабируемую бизнес-модель'
                ]
              },
              {
                name: 'Нетворкинг и связи',
                level: 3,
                maxLevel: 10,
                tooltips: [
                  'Создайте профиль в деловых соцсетях',
                  'Посетите бизнес-мероприятие',
                  'Установите 5 новых деловых контактов',
                  'Вступите в бизнес-сообщество',
                  'Проведите презентацию своего бизнеса',
                  'Найдите ментора в своей отрасли',
                  'Станьте спикером на отраслевом мероприятии',
                  'Создайте партнерство с другим бизнесом',
                  'Организуйте собственное нетворкинг-мероприятие',
                  'Станьте лидером мнений в своей нише'
                ]
              },
              {
                name: 'Работа с клиентами и продажи',
                level: 8,
                maxLevel: 10,
                tooltips: [
                  'Создайте портрет идеального клиента',
                  'Разработайте скрипт продаж',
                  'Внедрите CRM-систему',
                  'Проведите анализ конкурентов',
                  'Разработайте программу лояльности',
                  'Внедрите систему обратной связи от клиентов',
                  'Оптимизируйте воронку продаж',
                  'Разработайте стратегию удержания клиентов',
                  'Внедрите автоматизацию маркетинга',
                  'Создайте систему рекомендаций и рефералов'
                ]
              },
              {
                name: 'Финансовое управление',
                level: 6,
                maxLevel: 10,
                tooltips: [
                  'Составьте финансовый план',
                  'Внедрите систему учета доходов и расходов',
                  'Рассчитайте точку безубыточности',
                  'Оптимизируйте налогообложение',
                  'Разработайте инвестиционную стратегию',
                  'Внедрите систему управления денежными потоками',
                  'Проведите финансовый аудит',
                  'Разработайте стратегию ценообразования',
                  'Привлеките внешнее финансирование',
                  'Создайте систему финансового планирования'
                ]
              },
              {
                name: 'Бухгалтерские и юр-е вопросы',
                level: 4,
                maxLevel: 10,
                tooltips: [
                  'Выберите оптимальную организационно-правовую форму',
                  'Зарегистрируйте бизнес',
                  'Оформите необходимые разрешения и лицензии',
                  'Заключите договоры с ключевыми партнерами',
                  'Разработайте внутренние нормативные документы',
                  'Защитите интеллектуальную собственность',
                  'Внедрите систему комплаенс',
                  'Оптимизируйте договорную работу',
                  'Разработайте стратегию управления рисками',
                  'Создайте систему корпоративного управления'
                ]
              }
            ],
            level_progress: {
              completed: 9,
              total: 10
            },
            achievements: [
              { 
                title: 'Star Performer', 
                icon: '⭐', 
                description: 'Достигнуто за выполнение всех заданий первого уровня с первой попытки'
              },
              { 
                title: 'Silver Medalist', 
                icon: '🏅', 
                description: 'Получено за прохождение 5 уровней подряд без перерыва'
              }
            ],
            contacts: {
              phone: '',
              email: user.email,
              social: []
            }
          })
        }
      }
      
      setLoading(false)
    }
    
    getUser()
  }, [])

  const handleTooltip = (skillIndex: number, levelIndex: number) => {
    setActiveTooltip({skillIndex, levelIndex});
  }

  const hideTooltip = () => {
    setActiveTooltip(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Шапка профиля */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
            {profile?.avatar_url ? (
              <Image 
                src={profile.avatar_url} 
                alt="Аватар пользователя"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{profile?.full_name}</h1>
            <p className="text-gray-600 mb-2">{profile?.role}</p>
          </div>
        </div>
      </div>

      {/* Бизнес-информация */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Информация о бизнесе</h2>
        <p className="text-gray-700 mb-4">
          {profile?.business_info?.type}, {profile?.business_info?.employees} сотрудников, 
          выручка - {profile?.business_info?.revenue}
        </p>
        <div className="mb-4">
          <p className="text-gray-600 font-medium mb-2">Основные цели:</p>
          <ul className="space-y-1 text-gray-600">
            {profile?.goals?.map((goal, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">{index + 1}.</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="flex items-center text-teal-600 hover:text-teal-800 transition-colors">
          <Edit className="h-4 w-4 mr-1" />
          Завершить заполнение Бизнес профиля
        </button>
      </div>

      {/* Секция навыков */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Навыки</h2>
        <div className="space-y-6">
          {profile?.skills?.map((skill, skillIndex) => (
            <div key={skillIndex}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">{skill.name}</p>
                <p className="text-sm text-gray-500">{skill.level}/{skill.maxLevel}</p>
              </div>
              <div className="flex space-x-1">
                {[...Array(skill.maxLevel)].map((_, levelIndex) => (
                  <div 
                    key={levelIndex}
                    className="relative"
                    onMouseEnter={() => handleTooltip(skillIndex, levelIndex)}
                    onMouseLeave={hideTooltip}
                  >
                    <div 
                      className={`h-3 w-3 rounded-full ${levelIndex < skill.level ? 'bg-teal-500' : 'bg-gray-300'}`}
                    ></div>
                    {activeTooltip && 
                     activeTooltip.skillIndex === skillIndex && 
                     activeTooltip.levelIndex === levelIndex && (
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                        <p>{skill.tooltips[levelIndex]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Достижения</h3>
        <div className="flex justify-around">
          {profile?.achievements?.map((achievement, index) => (
            <div key={index} className="text-center cursor-pointer group relative">
              <span className="block text-3xl mb-2">{achievement.icon}</span>
              <p className="text-gray-700">{achievement.title}</p>
              
              {/* Всплывающее описание достижения */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 bg-white text-gray-800 text-sm rounded shadow-lg border border-gray-200">
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Личные и контактные данные */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Личные и контактные данные</h3>
          <button className="text-teal-600 hover:text-teal-800 transition-colors">
            <Edit className="h-4 w-4" />
          </button>
        </div>
        
        {profile?.contacts?.phone || profile?.contacts?.email || (profile?.contacts?.social && profile.contacts.social.length > 0) ? (
          <div className="space-y-3">
            {profile.contacts.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{profile.contacts.phone}</span>
              </div>
            )}
            {profile.contacts.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{profile.contacts.email}</span>
              </div>
            )}
            {profile.contacts.social && profile.contacts.social.map((social, index) => (
              <div key={index} className="flex items-center text-gray-600">
                <Globe className="h-4 w-4 mr-2" />
                <span>{social}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <Info className="h-4 w-4 mr-2" />
            <span>Добавьте личные данные и контакты</span>
          </div>
        )}
      </div>
    </div>
  )
}
