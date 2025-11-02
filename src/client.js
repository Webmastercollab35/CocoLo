import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwgayloevgnizzqmybcb.supabase.co'
const environmentKey =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_KEY)
    || (typeof process !== 'undefined' ? process.env.SUPABASE_KEY : undefined)

export const isSupabaseConfigured = Boolean(environmentKey)

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase n'est pas configuré : définissez VITE_SUPABASE_KEY (Vite) ou SUPABASE_KEY (Node) pour activer la persistance."
  )
}

const safeKey = environmentKey || 'public-anon-key'

export const supabase = createClient(supabaseUrl, safeKey, {
  auth: { persistSession: false },
})
