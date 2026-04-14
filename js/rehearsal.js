function formatDate(dateString) {
  const d = new Date(dateString)
  return d.toLocaleDateString("de-DE")
}

fetch("data/rehearsals.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("rehearsalList")
    container.innerHTML = ""

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

  })
