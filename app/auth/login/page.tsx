'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert('Ошибка авторизации: ' + error.message)
    else window.location.href = '/dashboard'
  }

  return (
    <div className="flex flex-col p-10 gap-4">
      <h2 className="text-xl">Вход на платформу</h2>
      <input type="email" placeholder="Email" className="p-2 border" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" className="p-2 border" onChange={(e) => setPassword(e.target.value)} />
      <button className="p-2 bg-blue-500 text-white" onClick={handleLogin}>Войти</button>
    </div>
  )
}
