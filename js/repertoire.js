async function loadSongs(){

const response = await fetch("data/songs.json")

const songs = await response.json()

const container = document.getElementById("songs")

songs.forEach(song => {

const div = document.createElement("div")

div.className = "song-card"

div.innerHTML =

`
<img src="${song.cover}" class="cover">

<h3>${song.title}</h3>

<a class="btn" href="song.html?s=${song.folder}">▶ Üben</a>

<a class="btn" href="scores/${song.folder}.pdf">🎼 Noten</a>
`

container.appendChild(div)

})

}

loadSongs()
