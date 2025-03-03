'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FAQItem = {
  id: number;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'Как начать обучение на платформе?',
      answer: 'Для начала обучения вам необходимо зарегистрироваться, после чего вы получите доступ к карте уровней. Начните с первого урока и последовательно продвигайтесь по карте, выполняя задания и получая обратную связь от наставника.'
    },
    {
      id: 2,
      question: 'Как получить доступ к следующему уроку?',
      answer: 'Доступ к следующему уроку открывается автоматически после успешного завершения текущего урока. Для завершения урока необходимо выполнить все задания и получить подтверждение от наставника.'
    },
    {
      id: 3,
      question: 'Как связаться с наставником?',
      answer: 'Для связи с наставником используйте раздел "Чат с наставником" в боковом меню. Вы можете задать любые вопросы, связанные с обучением, и получить профессиональную консультацию.'
    },
    {
      id: 4,
      question: 'Что такое артефакты и как их создавать?',
      answer: 'Артефакты — это результаты вашей работы над заданиями курса. Это могут быть бизнес-планы, маркетинговые стратегии, финансовые модели и другие документы. Для создания артефакта перейдите в соответствующий раздел и следуйте инструкциям.'
    },
    {
      id: 5,
      question: 'Как долго длится обучение?',
      answer: 'Продолжительность обучения зависит от вашего темпа и регулярности занятий. В среднем, для прохождения всех 10 уровней требуется от 2 до 3 месяцев при условии занятий 3-4 раза в неделю.'
    },
    {
      id: 6,
      question: 'Могу ли я получить сертификат после завершения обучения?',
      answer: 'Да, после успешного прохождения всех уровней вы получите сертификат о завершении обучения. Сертификат будет доступен в разделе "Профиль" и его можно будет скачать в формате PDF.'
    },
    {
      id: 7,
      question: 'Что делать, если я столкнулся с техническими проблемами?',
      answer: 'В случае возникновения технических проблем, пожалуйста, обратитесь в службу поддержки через раздел "Настройки" -> "Поддержка". Наша команда поможет вам решить любые технические вопросы в кратчайшие сроки.'
    }
  ]
  
  const toggleItem = (id: number) => {
    if (openItem === id) {
      setOpenItem(null)
    } else {
      setOpenItem(id)
    }
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Частые Вопросы</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="text-lg font-medium text-gray-800">{item.question}</h3>
                {openItem === item.id ? (
                  <ChevronUp className="text-teal-500" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400" size={20} />
                )}
              </button>
              
              {openItem === item.id && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 