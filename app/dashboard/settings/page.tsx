'use client'
import { useState } from 'react'

type Settings = {
  notifications: boolean;
  emailUpdates: boolean;
  language: 'ru' | 'en';
  theme: 'light' | 'dark';
}

type SettingValue = boolean | 'ru' | 'en' | 'light' | 'dark';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    emailUpdates: true,
    language: 'ru',
    theme: 'light'
  })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSettingChange = (key: keyof Settings, value: SettingValue) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      // TODO: Здесь будет сохранение настроек в базу данных
      await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация запроса
      setMessage({ type: 'success', text: 'Настройки успешно сохранены' })
    } catch {
      setMessage({ type: 'error', text: 'Произошла ошибка при сохранении настроек' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Уведомления */}
          <div>
            <h3 className="text-lg font-medium mb-4">Уведомления</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Включить push-уведомления</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailUpdates}
                  onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Получать обновления на email</span>
              </label>
            </div>
          </div>

          {/* Язык */}
          <div>
            <h3 className="text-lg font-medium mb-4">Язык</h3>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value as 'ru' | 'en')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Тема */}
          <div>
            <h3 className="text-lg font-medium mb-4">Тема оформления</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={(e) => handleSettingChange('theme', e.target.value as 'light' | 'dark')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2">Светлая</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={(e) => handleSettingChange('theme', e.target.value as 'light' | 'dark')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2">Темная</span>
              </label>
            </div>
          </div>

          {/* Сообщение об успехе/ошибке */}
          {message && (
            <div className={`rounded-md p-4 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {/* Кнопка сохранения */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-4 py-2 rounded-md text-white ${
                isSaving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSaving ? 'Сохранение...' : 'Сохранить настройки'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
