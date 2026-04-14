function formatDate(dateString) {
  const d = new Date(dateString)
  return d.toLocaleDateString("de-DE")
}

// 👉 Laden beim Start
loadRehearsals()

function loadRehearsals() {
  const container = document.getElementById("rehearsalList")
  container.innerHTML = ""

  const data = JSON.parse(localStorage.getItem("rehearsals")) || []

  data.forEach(r => {
    const div = document.createElement("div")
    div.className = "rehearsal"

    const songs = (r.songs || [])
      .map(song => "<li>" + song + "</li>")
      .join("")

    div.innerHTML = `
      <h2>📅 ${formatDate(r.date)}</h2>

      <p><b>Uhrzeit:</b> ${r.time}</p>
      <p><b>Ort:</b> ${r.location}</p>

      <h3>🎼 Stücke</h3>
      <ul>${songs}</ul>

      <h3>👥 Stimmen</h3>
      <p>Sopran: ${r.voices.Sopran}</p>
      <p>Alt: ${r.voices.Alt}</p>
      <p>Tenor: ${r.voices.Tenor}</p>
      <p>Bass: ${r.voices.Bass}</p>
    `

    container.appendChild(div)
  })
}

// 👉 Neue Probe speichern
function addRehearsal() {

  const date = document.getElementById("date").value
  const time = document.getElementById("time").value
  const location = document.getElementById("location").value
  const songsInput = document.getElementById("songs").value

  const songs = songsInput.split(",").map(s => s.trim())

  // 👉 Stimmen automatisch aus members.json zählen (optional später)
  const rehearsal = {
    date,
    time,
    location,
    songs,
    voices: {
      Sopran: 0,
      Alt: 0,
      Tenor: 0,
      Bass: 0
    }
  }

  const data = JSON.parse(localStorage.getItem("rehearsals")) || []
  data.push(rehearsal)

  localStorage.setItem("rehearsals", JSON.stringify(data))

  loadRehearsals()

  // Felder leeren
  document.getElementById("date").value = ""
  document.getElementById("time").value = ""
  document.getElementById("location").value = ""
  document.getElementById("songs").value = ""
}
