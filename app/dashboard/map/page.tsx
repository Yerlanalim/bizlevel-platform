'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Lock } from 'lucide-react'

// Определяем тип для урока
type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  completed?: boolean;
  locked?: boolean;
  image_url?: string;
  position: number;
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
          title: 'Бизнес-модель',
          subtitle: 'Основы построения бизнес-модели',
          completed: true,
          locked: false,
          image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300',
          position: 1
        },
        {
          id: 2,
          title: 'Ценностное предложение',
          subtitle: 'Создание уникального предложения',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300',
          position: 2
        },
        {
          id: 3,
          title: 'Сегменты клиентов',
          subtitle: 'Определение целевой аудитории',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=300',
          position: 3
        },
        {
          id: 4,
          title: 'Каналы сбыта',
          subtitle: 'Стратегии доставки ценности клиентам',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=300',
          position: 4
        },
        {
          id: 5,
          title: 'Отношения с клиентами',
          subtitle: 'Построение долгосрочных отношений',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300',
          position: 5
        },
        {
          id: 6,
          title: 'Потоки доходов',
          subtitle: 'Монетизация бизнес-модели',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300',
          position: 6
        },
        {
          id: 7,
          title: 'Ключевые ресурсы',
          subtitle: 'Определение необходимых активов',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300',
          position: 7
        },
        {
          id: 8,
          title: 'Ключевые активности',
          subtitle: 'Основные бизнес-процессы',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300',
          position: 8
        },
        {
          id: 9,
          title: 'Ключевые партнеры',
          subtitle: 'Создание стратегических партнерств',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300',
          position: 9
        },
        {
          id: 10,
          title: 'Структура расходов',
          subtitle: 'Анализ и оптимизация затрат',
          completed: false,
          locked: true,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300',
          position: 10
        }
      ]
      
      // Сортируем уроки по позиции
      mockLessons.sort((a, b) => a.position - b.position)
      
      setLessons(mockLessons)
      setLoading(false)
    }
    
    fetchLessons()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4">Загрузка карты уровней...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Карта Уровней</h1>
      
      <div className="flex">
        {/* Основной контент с карточками уроков */}
        <div className="flex-1 pr-8">
          <div className="space-y-6">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="relative">
                <Link href={lesson.locked ? '#' : `/dashboard/lessons/${lesson.id}`}>
                  <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${lesson.completed ? 'border-l-4 border-teal-500' : ''}`}>
                    <div className="flex items-center p-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800">{lesson.title}</h2>
                        <p className="text-gray-600">{lesson.subtitle}</p>
                      </div>
                      
                      {lesson.image_url && (
                        <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                          <Image 
                            src={lesson.image_url} 
                            alt={lesson.title} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Индикаторы прогресса справа */}
        <div className="w-16">
          <div className="sticky top-8 space-y-6">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="flex justify-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  lesson.completed 
                    ? 'bg-teal-100 text-teal-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle size={20} className="text-teal-600" />
                  ) : lesson.locked ? (
                    <Lock size={16} className="text-gray-400" />
                  ) : (
                    <span className="font-semibold">{lesson.position}</span>
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