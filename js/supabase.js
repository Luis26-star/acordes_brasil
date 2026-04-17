// js/supabase.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// DEINE SUPABASE-DATEN (aus dem Dashboard)
const SUPABASE_URL = "https://xpdettowaygoekrdxdpq.supabase.co"
const SUPABASE_KEY = "HIER KOMMT DEIN ANON KEY REIN"  // ← Den musst du kopieren!

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

