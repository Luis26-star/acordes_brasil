// js/supabase.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// DEINE SUPABASE-DATEN (aus dem Dashboard)
const SUPABASE_URL = "https://xpdettowaygoekrdxdpq.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZGV0dG93YXlnb2VrcmR4ZHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzE0NjksImV4cCI6MjA5MjAwNzQ2OX0.gWkqyDcJ58qc-RvbquvTOCda7O5Tr7FsNTF9Bce451Q"  // ← Den musst du kopieren!

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

