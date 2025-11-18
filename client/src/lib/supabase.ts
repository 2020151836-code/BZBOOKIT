import { createClient } from '@supabase/supabase-js'

// 1. Read the environment variables using import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. Add a check to ensure they are not undefined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in .env file.");
}

// 3. Create and export the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
