import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwgayloevgnizzqmybcb.supabase.co'
const supabaseKey =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_KEY)
    || (typeof process !== 'undefined' ? process.env.SUPABASE_KEY : undefined)

if (!supabaseKey) {
  console.warn('Supabase key manquante : définissez VITE_SUPABASE_KEY ou SUPABASE_KEY dans vos variables d\'environnement')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
