import { createClient } from "@supabase/supabase-js";



export const supabase = createClient("https://dpzomyklvfwauezwmdja.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
