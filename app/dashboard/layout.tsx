'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'
import { useEffect, useState } from 'react'
import { 
  Map, 
  User, 
  BookOpen, 
  MessageSquare, 
  Archive, 
  Settings, 
  HelpCircle, 
  LogOut,
  Home
} from 'lucide-react'

// Определяем тип для пользователя
type User = {
  id: string;
  role?: string;
}

// Определяем тип для пункта меню
type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  adminOnly?: boolean;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Получаем роль пользователя из профиля
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        setUser({
          id: user.id,
          role: profile?.role || 'user'
        })
      }
    }
    
    getUser()
  }, [])

  // Боковое меню
  const menuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      title: 'Дашборд', 
      icon: <Home size={20} />, 
      href: '/dashboard',
      adminOnly: true
    },
    { 
      id: 'map', 
      title: 'Карта уровней', 
      icon: <Map size={20} />, 
      href: '/dashboard/map',
    },
    { 
      id: 'lessons', 
      title: 'Все уроки', 
      icon: <BookOpen size={20} />, 
      href: '/dashboard/lessons',
      adminOnly: true
    },
    { 
      id: 'profile', 
      title: 'Профиль', 
      icon: <User size={20} />, 
      href: '/dashboard/profile',
    },
    { 
      id: 'chat', 
      title: 'Чат с наставником', 
      icon: <MessageSquare size={20} />, 
      href: '/dashboard/chat',
    },
    { 
      id: 'artifacts', 
      title: 'Артефакты', 
      icon: <Archive size={20} />, 
      href: '/dashboard/artifacts',
    },
    { 
      id: 'settings', 
      title: 'Настройки', 
      icon: <Settings size={20} />, 
      href: '/dashboard/settings',
    },
    { 
      id: 'faq', 
      title: 'Частые Вопросы', 
      icon: <HelpCircle size={20} />, 
      href: '/dashboard/faq',
    },
  ]

  // Фильтруем пункты меню в зависимости от роли пользователя
  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly) {
      return user?.role === 'admin'
    }
    return true
  })

  // Проверяем, активен ли пункт меню
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковое меню */}
      <div className="w-64 bg-gray-100 shadow-md fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-teal-600">BizLevel</h2>
        </div>
        <nav className="mt-6">
          <ul>
            {filteredMenuItems.map(item => (
              <li key={item.id}>
                <Link 
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 ${isActive(item.href) ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-600' : ''}`}
                >
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Кнопка выхода */}
        <div className="absolute bottom-0 w-full p-6">
          <button 
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center justify-center"
          >
            <LogOut size={18} className="mr-2" />
            Выйти
          </button>
        </div>
      </div>
      
      {/* Основной контент */}
      <div className="ml-64 flex-1">
        {children}
      </div>
    </div>
  )
} 