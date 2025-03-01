'use client'

export default function ArtifactsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Артефакты</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">
          Здесь будут отображаться ваши артефакты и достижения в процессе обучения.
        </p>
        
        {/* Заглушка для будущего контента */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-full h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Артефакт {item}</h3>
              <p className="text-gray-600 text-sm">
                Краткое описание артефакта и его значимости в вашем обучении.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Получен: скоро</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
