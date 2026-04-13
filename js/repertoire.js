async function loadSongs(){

const response = await fetch("data/songs.json")
const songs = await response.json()

const container = document.getElementById("songs")

songs.forEach(song => {

const div = document.createElement("div")

div.innerHTML =
"<h3>" + song.title + "</h3>" +
"<a href='song.html?s=" + song.folder + "'>▶ Play</a>"

container.appendChild(div)

})

}

loadSongs()
