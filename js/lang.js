let currentLang = 'de'
let translations = {}

async function loadLang(lang) {
  const res = await fetch(`/data/lang/${lang}.json`)
  translations = await res.json()
  currentLang = lang
  applyLang()
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')
    if (translations[key]) el.innerText = translations[key]
  })
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => loadLang(btn.dataset.lang))
})

loadLang('de')
