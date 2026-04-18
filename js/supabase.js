// js/supabase.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// DEINE SUPABASE-DATEN (aus dem Dashboard)
const SUPABASE_URL = "https://xpdettowaygoekrdxdpq.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZGV0dG93YXlnb2VrcmR4ZHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzE0NjksImV4cCI6MjA5MjAwNzQ2OX0.gWkqyDcJ58qc-RvbquvTOCda7O5Tr7FsNTF9Bce451Q"  // ← Den musst du kopieren!

// ==================== DEMO-MODUS ====================
const isConfigured = SUPABASE_KEY !== "DEIN-ANON-KEY" && SUPABASE_URL !== "https://DEIN-PROJEKT.supabase.co";

if (!isConfigured) {
  console.warn("⚠️ Supabase nicht konfiguriert – Demo-Modus aktiv");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    storageKey: 'acordes-auth'
}
});

export const isSupabaseConfigured = isConfigured;

// ==================== DSGVO-FUNKTIONEN ====================
export async function getUserDataForGDPR(userId) {
  const { data: member } = await supabase.from('members').select('*').eq('id', userId).single();
  const { data: attendance } = await supabase.from('attendance').select('*').eq('member_id', userId);
  return { member, attendance };
}

export async function anonymizeUserData(userId) {
  return await supabase.from('members').update({ 
    email: null, phone: null, name: `Gelöschter Nutzer`, is_active: false 
  }).eq('id', userId);
}


