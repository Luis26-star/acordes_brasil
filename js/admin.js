// ==================================================================
//  js/admin.js – Vorstandspanel: Proben, Mitglieder, Export
// ==================================================================

import { supabase } from './supabaseClient.js'

// ==================== HILFSFUNKTIONEN ====================

function formatGermanDate(date) {
  if (!date) return '—'
  const [y, m, d] = date.split('-')
  return `${d}.${m}.${y}`
}

function formatGermanTime(time) {
  if (!time) return '—'
  return time.slice(0, 5)
}

function escapeHtml(str = '') {
  return str.replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]))
}

// ==================== AUTH ====================
// Nur fürs schnelle Testen – produktiv lieber Supabase-Auth prüfen!
async function checkAdminAuth() {
  const flag = sessionStorage.getItem('admin_auth')
  if (flag === 'true') return true

  const pw = prompt('Admin Passwort:')
  if (pw === 'Acordes2025') {
    sessionStorage.setItem('admin_auth', 'true')
    return true
  }
  alert('❌ Falsches Passwort!')
  location.href = '../login.html'
  return false
}

// ==================== PROBEN ====================

async function loadRehearsals() {
  const tbody = document.getElementById('rehearsalsTableBody')
  if (!tbody) return

  const { data, error } = await supabase
    .from('rehearsals')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Fehler beim Laden:', error)
    tbody.innerHTML = `<tr><td colspan="4">⚠️ Fehler beim Laden</td></tr>`
    return
  }

  if (!data || !data.length) {
    tbody.innerHTML = `<tr><td colspan="4">Keine Proben</td></tr>`
    return
  }

  tbody.innerHTML = data
    .map(r => `
      <tr>
        <td>${formatGermanDate(r.date)}</td>
        <td>${formatGermanTime(r.time)} Uhr</td>
        <td>${escapeHtml(r.location)}</td>
        <td>
          <button class="btn-warning" data-id="${r.id}" data-action="edit">✏️</button>
          <button class="btn-danger" data-id="${r.id}" data-action="delete">🗑️</button>
        </td>
      </tr>`).join('')

  // Buttons delegiert behandeln
  tbody.onclick = async e => {
    const id = e.target.dataset.id
    const action = e.target.dataset.action
    if (action === 'edit') editRehearsal(id)
    if (action === 'delete') deleteRehearsal(id)
  }
}

// ==================== SPEICHERN / BEARBEITEN ====================

let currentRehearsalId = null

window.saveRehearsal = async () => {
  const date = document.getElementById('rehearsalDate').value
  const time = document.getElementById('rehearsalTime').value
  const location = document.getElementById('rehearsalLocation').value

  if (!date || !time || !location) {
    alert('Bitte alle Felder ausfüllen!')
    return
  }

  const record = { date, time: time + ':00', location }

  if (currentRehearsalId) {
    await supabase.from('rehearsals').update(record).eq('id', currentRehearsalId)
    currentRehearsalId = null
  } else {
    await supabase.from('rehearsals').insert([record])
  }

  closeModal?.('rehearsalModal')
  loadRehearsals()
  loadDashboard?.()
}

function editRehearsal(id) {
  currentRehearsalId = id
  document.getElementById('rehearsalModal').style.display = 'block'
}

async function deleteRehearsal(id) {
  if (!confirm('Wirklich löschen?')) return
  await supabase.from('rehearsals').delete().eq('id', id)
  loadRehearsals()
}

// ==================== EXPORT ====================

window.exportAllData = async () => {
  const tables = ['members', 'rehearsals', 'events', 'songs', 'attendance']
  const exportData = {}
  for (const t of tables) {
    const { data } = await supabase.from(t).select('*')
    exportData[t] = data || []
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `chor_backup_${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', async () => {
  if (await checkAdminAuth()) {
    loadRehearsals()
    loadDashboard?.()
  }
})
