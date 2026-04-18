// js/admin.js
import { supabase } from './supabase.js'

// ==================== HILFSFUNKTIONEN ====================
function formatGermanDate(dateString) {
  if (!dateString) return '—';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
}

function formatGermanTime(timeString) {
  if (!timeString) return '—';
  return timeString.slice(0,5);
}

// ==================== ADMIN AUTH ====================
async function checkAdminAuth() {
  const adminAuth = sessionStorage.getItem('admin_auth');
  if (adminAuth === 'true') return true;
  
  const pw = prompt("Admin Passwort:");
  if (pw === "Acordes2025") {
    sessionStorage.setItem('admin_auth', 'true');
    return true;
  }
  alert("Falsches Passwort!");
  window.location.href = 'index.html';
  return false;
}

// ==================== PROBEN (mit deutscher Uhrzeit) ====================
async function loadRehearsals() {
  const { data } = await supabase.from('rehearsals').select('*').order('date', { ascending: false });
  const tbody = document.getElementById('rehearsalsTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = data?.map(r => `
    <tr>
      <td>${formatGermanDate(r.date)}</td>
      <td>${formatGermanTime(r.time)} Uhr</td>
      <td>${escapeHtml(r.location)}</td>
      <td>
        <button class="btn-warning" onclick="editRehearsal('${r.id}')">✏️</button>
        <button class="btn-danger" onclick="deleteRehearsal('${r.id}')">🗑️</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="4">Keine Proben</td></tr>';
}

window.saveRehearsal = async () => {
  const date = document.getElementById('rehearsalDate').value;
  const time = document.getElementById('rehearsalTime').value;
  const location = document.getElementById('rehearsalLocation').value;
  
  if (!date || !time || !location) {
    alert("Bitte alle Felder ausfüllen!");
    return;
  }
  
  const rehearsal = { date, time: time + ':00', location };
  
  if (currentRehearsalId) {
    await supabase.from('rehearsals').update(rehearsal).eq('id', currentRehearsalId);
    currentRehearsalId = null;
  } else {
    await supabase.from('rehearsals').insert([rehearsal]);
  }
  
  closeModal('rehearsalModal');
  loadRehearsals();
  loadDashboard();
};

// ==================== EXPORT ====================
window.exportAllData = async () => {
  const tables = ['members', 'rehearsals', 'events', 'songs', 'attendance'];
  const exportData = {};
  for (const t of tables) {
    const { data } = await supabase.from(t).select('*');
    exportData[t] = data;
  }
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chor_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
};

// INIT
document.addEventListener('DOMContentLoaded', async () => {
  if (await checkAdminAuth()) {
    loadRehearsals();
    loadMembers();
    loadDashboard();
  }
});
