'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'

// Определяем типы
type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
  image_url?: string;
  content: string;
  video_url?: string;
  tasks: Task[];
}

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function LessonDetail() {
  const params = useParams()
  const lessonId = Number(params.id)
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('content') // 'content', 'tasks', 'discussion'
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchLesson = async () => {
      // Имитация задержки загрузки
      await new Promise(resolve => setTimeout(resolve, 700))
      
      // Моковые данные урока
      const mockLesson: Lesson = {
        id: lessonId,
        title: lessonId === 1 ? 'Основы бизнес-моделирования' : 
               lessonId === 2 ? 'Анализ рынка и конкурентов' : 
               lessonId === 3 ? 'Финансовое планирование' :
               lessonId === 4 ? 'Маркетинговая стратегия' :
               'Управление командой',
        description: 'Подробное изучение принципов и методов построения успешных бизнес-моделей.',
        duration: 45,
        level: lessonId <= 2 ? 'beginner' : lessonId <= 4 ? 'intermediate' : 'advanced',
        completed: lessonId === 1,
        image_url: `https://images.unsplash.com/photo-${lessonId === 1 ? '1454165804606-c3d57bc86b40' : 
                    lessonId === 2 ? '1551288049-bebda4e38f71' : 
                    lessonId === 3 ? '1554224155-6726b3ff858f' :
                    lessonId === 4 ? '1533750516457-a7f992034fec' :
                    '1522071820081-009f0129c71c'}?q=80&w=1200`,
        content: `
          <h2>Введение в бизнес-моделирование</h2>
          <p>Бизнес-модель — это концептуальное описание предпринимательской деятельности. Она определяет, как компания создает, доставляет и получает ценность.</p>
          
          <h3>Ключевые элементы бизнес-модели:</h3>
          <ul>
            <li><strong>Ценностное предложение</strong> — что вы предлагаете клиентам и почему они должны выбрать именно вас</li>
            <li><strong>Сегменты клиентов</strong> — кто ваши целевые клиенты</li>
            <li><strong>Каналы сбыта</strong> — как вы доставляете ценность клиентам</li>
            <li><strong>Отношения с клиентами</strong> — как вы взаимодействуете с клиентами</li>
            <li><strong>Потоки доходов</strong> — как вы зарабатываете деньги</li>
            <li><strong>Ключевые ресурсы</strong> — что вам нужно для создания ценности</li>
            <li><strong>Ключевые активности</strong> — что вы делаете для создания ценности</li>
            <li><strong>Ключевые партнеры</strong> — кто помогает вам создавать ценность</li>
            <li><strong>Структура затрат</strong> — на что вы тратите деньги</li>
          </ul>
          
          <h3>Бизнес-модель Canvas</h3>
          <p>Один из самых популярных инструментов для разработки бизнес-моделей — это Business Model Canvas, разработанный Александром Остервальдером.</p>
          
          <h3>Примеры успешных бизнес-моделей</h3>
          <p>Рассмотрим несколько примеров успешных бизнес-моделей:</p>
          <ol>
            <li><strong>Freemium</strong> — базовый продукт бесплатно, премиум-функции за деньги (Spotify, Dropbox)</li>
            <li><strong>Подписка</strong> — регулярная плата за доступ к продукту или услуге (Netflix, Microsoft 365)</li>
            <li><strong>Маркетплейс</strong> — платформа, соединяющая продавцов и покупателей (Amazon, Airbnb)</li>
            <li><strong>Razor and blades</strong> — дешевый основной продукт и дорогие расходные материалы (принтеры и картриджи)</li>
          </ol>
        `,
        video_url: 'https://www.youtube.com/embed/QoAOzMTLP5s',
        tasks: [
          {
            id: 1,
            title: 'Определите ценностное предложение',
            description: 'Сформулируйте ценностное предложение для вашего бизнеса или идеи.',
            completed: lessonId === 1
          },
          {
            id: 2,
            title: 'Создайте Business Model Canvas',
            description: 'Заполните все 9 блоков Business Model Canvas для вашего бизнеса.',
            completed: false
          },
          {
            id: 3,
            title: 'Анализ конкурентов',
            description: 'Проанализируйте бизнес-модели 3 ваших основных конкурентов.',
            completed: false
          }
        ]
      }
      
      setLesson(mockLesson)
      setTasks(mockLesson.tasks)
      setLoading(false)
    }
    
    fetchLesson()
  }, [lessonId])

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
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

  // Функция для определения цвета уровня сложности
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Загрузка урока...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Урок не найден</h1>
          <Link href="/dashboard/lessons" className="text-blue-500 hover:underline">
            Вернуться к списку уроков
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/dashboard/lessons" className="text-blue-500 hover:underline">
          ← Назад к списку уроков
        </Link>
      </div>
      
      {/* Заголовок и информация об уроке */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {lesson.image_url && (
          <div className="h-64 overflow-hidden">
            <img 
              src={lesson.image_url} 
              alt={lesson.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            {lesson.completed && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Пройден
              </span>
            )}
          </div>
          <p className="text-gray-700 mb-4">{lesson.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {lesson.duration} минут
            </span>
            <span className={`px-3 py-1 rounded-full ${getLevelColor(lesson.level)}`}>
              {getLevelText(lesson.level)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Табы */}
      <div className="mb-6 border-b">
        <div className="flex">
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('content')}
          >
            Содержание
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'tasks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('tasks')}
          >
            Задания
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'discussion' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('discussion')}
          >
            Обсуждение
          </button>
        </div>
      </div>
      
      {/* Содержимое табов */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'content' && (
          <div>
            {lesson.video_url && (
              <div className="mb-6 aspect-w-16 aspect-h-9">
                <iframe 
                  className="w-full h-96 mb-6"
                  src={lesson.video_url} 
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
            <div className="mt-8 flex justify-between">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setActiveTab('tasks')}
              >
                Перейти к заданиям
              </button>
              {!lesson.completed && (
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    // В реальном приложении здесь будет запрос к API
                    alert('Урок отмечен как пройденный!')
                  }}
                >
                  Отметить как пройденный
                </button>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Задания</h2>
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'discussion' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Обсуждение</h2>
            <p className="text-gray-600 mb-4">Здесь вы можете задать вопросы и обсудить материал урока с другими учениками и преподавателем.</p>
            <div className="border rounded-lg p-4 mb-6">
              <textarea 
                className="w-full p-2 border rounded mb-2" 
                rows={4}
                placeholder="Напишите ваш вопрос или комментарий..."
              ></textarea>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Отправить
              </button>
            </div>
            <div className="text-center text-gray-500">
              Комментариев пока нет. Будьте первым!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
