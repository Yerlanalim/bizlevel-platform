'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabaseClient'

export default function Signup() {
  const supabase = createClient();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert('Ошибка регистрации: ' + error.message)
    } else {
      alert('Регистрация прошла успешно! Пожалуйста, проверьте почту и подтвердите регистрацию.')
    }
  }

  return (
    <div className="flex flex-col p-10 gap-4">
      <h2 className="text-xl">Регистрация на платформе</h2>
      <input 
        type="email" 
        placeholder="Email" 
        className="p-2 border" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        className="p-2 border" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button 
        className="p-2 bg-green-500 text-white" 
        onClick={handleSignup}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}
