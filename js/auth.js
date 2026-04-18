import { supabase } from './supabaseClient.js'

// Login‑Formular
const form = document.getElementById('loginForm')
form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return alert('❌ Login falhou: ' + error.message)

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profile?.role === 'admin') location.href = 'admin/index.html'
  else location.href = 'member/index.html'
})
