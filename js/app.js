// js/app.js
import { supabase, isSupabaseConfigured } from './supabase.js'

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

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

// ==================== NAVIGATION ====================
function showTab(tab, btnElement) {
  const tabs = ['cultural', 'repertoire', 'karaoke', 'player', 'events', 'members', 'vocalCoach', 'analytics'];
  tabs.forEach(t => {
    const el = document.getElementById(t + 'Tab');
    if (el) el.style.display = t === tab ? 'block' : 'none';
  });
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  
  if (tab === 'repertoire') renderRepertoire();
  if (tab === 'events') loadEvents();
  if (tab === 'members') loadMembers();
}

// ==================== REPERTOIRE ====================
async function renderRepertoire() {
  const { data: songs } = await supabase.from('songs').select('*').order('title');
  const container = document.getElementById('repertoireGrid');
  if (!container) return;
  
  container.innerHTML = songs?.map(song => `
    <div class="repertoire-card">
      <div class="repertoire-title">🎵 ${escapeHtml(song.title)}</div>
      <div class="repertoire-composer">${escapeHtml(song.composer || '—')} (${song.year || '—'})</div>
      <div class="repertoire-desc">Klicke auf "Karaoke", um mit den Noten zu üben.</div>
      <button class="control-btn" onclick="window.openKaraokeForSong('${song.id}')">🎤 Karaoke lernen</button>
    </div>
  `).join('') || '<div>Keine Songs im Repertoire</div>';
}

// ==================== PROBEN ANZEIGEN ====================
async function loadEvents() {
  const { data: rehearsals } = await supabase.from('rehearsals').select('*').order('date', { ascending: true }).limit(5);
  const container = document.getElementById('eventsList');
  if (!container) return;
  
  container.innerHTML = rehearsals?.map(r => `
    <div class="event-item">
      <div>
        <strong>📅 ${formatGermanDate(r.date)}</strong>
        <span style="margin-left:10px;">⏰ ${formatGermanTime(r.time)} Uhr</span>
        <div>📍 ${escapeHtml(r.location)}</div>
      </div>
      <button class="control-btn" onclick="window.addToCalendar('${r.id}')">📅 Zum Kalender</button>
    </div>
  `).join('') || '<div>📭 Keine anstehenden Proben</div>';
}

// ==================== KARAOKE ÖFFNEN ====================
window.openKaraokeForSong = function(songId) {
  showTab('karaoke', document.querySelector('[data-tab="karaoke"]'));
  // Song im Karaoke-Tab laden
  const songSelect = document.getElementById('karaokeSongSelect');
  if (songSelect) songSelect.value = songId;
  if (window.loadKaraokeSong) window.loadKaraokeSong(songId);
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  renderRepertoire();
  loadEvents();
  
  // Service Worker registrieren
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
      console.log('Service Worker registriert');
    });
  }
});

// Globale Funktionen
window.showTab = showTab;
window.formatGermanDate = formatGermanDate;
window.formatGermanTime = formatGermanTime;
window.escapeHtml = escapeHtml;
