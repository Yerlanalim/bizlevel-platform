'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Определяем тип для урока
type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: number; // в минутах
  level: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
  image_url?: string;
}

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь будет запрос к Supabase
    // Пока используем моковые данные
    const fetchLessons = async () => {
      // Имитация задержки загрузки
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Моковые данные уроков
      const mockLessons: Lesson[] = [
        {
          id: 1,
          title: 'Основы бизнес-моделирования',
          description: 'Изучите основные принципы построения бизнес-моделей и создайте свой первый бизнес-план.',
          duration: 45,
          level: 'beginner',
          completed: true,
          image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300'
        },
        {
          id: 2,
          title: 'Анализ рынка и конкурентов',
          description: 'Научитесь анализировать рынок и конкурентов для выявления возможностей для вашего бизнеса.',
          duration: 60,
          level: 'intermediate',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300'
        },
        {
          id: 3,
          title: 'Финансовое планирование',
          description: 'Разработка финансовой модели и прогнозирование денежных потоков для вашего бизнеса.',
          duration: 75,
          level: 'advanced',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=300'
        },
        {
          id: 4,
          title: 'Маркетинговая стратегия',
          description: 'Создание эффективной маркетинговой стратегии для привлечения и удержания клиентов.',
          duration: 55,
          level: 'intermediate',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=300'
        },
        {
          id: 5,
          title: 'Управление командой',
          description: 'Принципы эффективного управления командой и развития корпоративной культуры.',
          duration: 65,
          level: 'advanced',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300'
        }
      ]
      
      setLessons(mockLessons)
      setLoading(false)
    }
    
    fetchLessons()
  }, [])

  // Функция для определения цвета уровня сложности
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Функция для перевода уровня сложности
  const getLevelText = (level: string) => {
    switch(level) {
      case 'beginner': return 'Начальный'
      case 'intermediate': return 'Средний'
      case 'advanced': return 'Продвинутый'
      default: return level
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Загрузка уроков...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Уроки и курсы</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => (
          <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {lesson.image_url && (
                <div className="h-40 overflow-hidden relative">
                  <Image 
                    src={lesson.image_url} 
                    alt={lesson.title} 
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{lesson.title}</h2>
                  {lesson.completed && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Пройден
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(lesson.level)}`}>
                    {getLevelText(lesson.level)}
                  </span>
                  <span className="text-gray-500 text-sm">{lesson.duration} мин</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 