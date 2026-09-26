import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rxykrcuyaerrqyqfajdm.supabase.co'
const supabaseKey = 'sb_publishable_6AeXJwYb95vlk4k6VHX8UA_F7zA6rCL'

export const supabase = createClient(supabaseUrl, supabaseKey)
