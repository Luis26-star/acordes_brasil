const today = new Date ()
today.setHours(0,0,0,0)
const nextRehearsal = rehearsals.find(r => {
const d = new Date(r.date)
return d >= today

} )
  
fetch("data/rehearsals.json")
.then(res => res.json())
.then(rehearsals => {

const container = document.getElementById("rehearsals")

if(nextRehearsal){

const d = new Date(nextRehearsal.date)

const dateFormatted = d.toLocaleDateString("de-DE",{
weekday:"long",
day:"2-digit",
month:"2-digit",
year:"numeric"
})

const songs = nextRehearsal.songs
.map(song => "<li>"+song+"</li>")
.join("")

const div = document.createElement("div")
div.className="rehearsal next"

div.innerHTML = `

<h2>⭐ Nächste Probe</h2>

<h3>📅 ${dateFormatted}</h3>

<p><b>Uhrzeit:</b> ${nextRehearsal.time}</p>
<p><b>Ort:</b> ${nextRehearsal.location}</p>

<h3>🎼 Stücke</h3>

<ul>
${songs}
</ul>

`

container.appendChild(div)

}
  
rehearsals.forEach(r => {
  const d = new Date(r.date)
  const dateFormated =d.toLocaleDateString("de-DE",{
weekday: "long",
day: "2-digit",
month: "2-digit",
year: "numeric"
} )

const div = document.createElement("div")
div.className="rehearsal"

const songs = r.songs.map(song => "<li>"+song+"</li>").join("")

div.innerHTML = `

<h2>📅 ${r.date}</h2>

<p><b>Uhrzeit:</b> ${r.time}</p>
<p><b>Ort:</b> ${r.location}</p>

<h3>🎼 Stücke</h3>
<ul>
${songs}
</ul>

<h3>👥 Stimmen</h3>

<p>Sopran: ${r.voices.Sopran}</p>
<p>Alt: ${r.voices.Alt}</p>
<p>Tenor: ${r.voices.Tenor}</p>
<p>Bass: ${r.voices.Bass}</p>

`

container.appendChild(div)

})

})
