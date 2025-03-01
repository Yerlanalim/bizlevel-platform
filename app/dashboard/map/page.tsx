'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Определяем тип для урока
type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
  image_url?: string;
  position: number; // позиция в карте уровней
}

export default function LevelMap() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь будет запрос к Supabase
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
          image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300',
          position: 1
        },
        {
          id: 2,
          title: 'Анализ рынка и конкурентов',
          description: 'Научитесь анализировать рынок и конкурентов для выявления возможностей для вашего бизнеса.',
          duration: 60,
          level: 'intermediate',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300',
          position: 2
        },
        {
          id: 3,
          title: 'Финансовое планирование',
          description: 'Разработка финансовой модели и прогнозирование денежных потоков для вашего бизнеса.',
          duration: 75,
          level: 'advanced',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=300',
          position: 3
        },
        {
          id: 4,
          title: 'Маркетинговая стратегия',
          description: 'Создание эффективной маркетинговой стратегии для привлечения и удержания клиентов.',
          duration: 55,
          level: 'intermediate',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=300',
          position: 4
        },
        {
          id: 5,
          title: 'Управление командой',
          description: 'Принципы эффективного управления командой и развития корпоративной культуры.',
          duration: 65,
          level: 'advanced',
          completed: false,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300',
          position: 5
        }
      ]
      
      // Сортируем уроки по позиции
      mockLessons.sort((a, b) => a.position - b.position)
      
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
          <p className="mt-4">Загрузка карты уровней...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Карта уровней</h1>
      
      <div className="max-w-3xl mx-auto">
        {/* Вертикальная карта уровней */}
        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
          
          {/* Уроки */}
          <div className="space-y-8">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="relative z-10">
                <div className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 ${lesson.completed ? 'bg-blue-500 border-blue-200' : 'bg-white border-gray-300'}`}></div>
                
                <div className="ml-16">
                  <Link href={`/dashboard/lessons/${lesson.id}`}>
                    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${lesson.completed ? 'border-l-4 border-blue-500' : ''}`}>
                      <div className="flex">
                        {lesson.image_url && (
                          <div className="w-1/3 h-40 relative">
                            <Image 
                              src={lesson.image_url} 
                              alt={lesson.title} 
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 w-2/3">
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
                    </div>
                  </Link>
                  
                  {/* Если это не последний урок, показываем стрелку вниз */}
                  {index < lessons.length - 1 && (
                    <div className="flex justify-center my-4">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 