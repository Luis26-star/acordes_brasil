import { supabase } from './supabaseClient.js'

// Prüfe Session
(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) location.href = '../login.html'
})()

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await supabase.auth.signOut()
  location.href = '../index.html'
})
