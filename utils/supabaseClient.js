// utils/supabaseClient.js
import { createBrowserClient } from '@supabase/ssr';

// Экспортируем готовый экземпляр клиента
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Экспортируем функцию для создания клиента (для обратной совместимости)
export const createClient = () => createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
