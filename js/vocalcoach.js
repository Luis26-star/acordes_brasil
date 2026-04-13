async function analyze(){

const fileInput = document.getElementById("audioFile")

if(!fileInput.files.length){

alert("Bitte Aufnahme wählen")
return

}

const file = fileInput.files[0]

const audioContext = new AudioContext()

const arrayBuffer = await file.arrayBuffer()

const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

const data = audioBuffer.getChannelData(0)

let sum = 0

for(let i=0;i<data.length;i++){

sum += Math.abs(data[i])

}

const avgVolume = sum / data.length

const result = document.getElementById("result")

let feedback = ""

if(avgVolume > 0.05){

feedback += "🔊 Stimme deutlich hörbar<br>"

}else{

feedback += "⚠ Aufnahme sehr leise<br>"

}

const pitch = detectPitch(data, audioContext.sampleRate)

if(pitch > 200 && pitch < 800){

feedback += "🎵 Tonhöhe erkannt: " + Math.round(pitch) + " Hz<br>"

}else{

feedback += "⚠ Tonhöhe schwer erkennbar<br>"

}

result.innerHTML = feedback

}
function detectPitch(buffer, sampleRate){

let SIZE = buffer.length
let bestOffset = -1
let bestCorrelation = 0
let rms = 0

for(let i=0;i<SIZE;i++){

let val = buffer[i]
rms += val*val

}

rms = Math.sqrt(rms/SIZE)

if(rms < 0.01) return -1

let lastCorrelation = 1

for(let offset=0; offset < SIZE/2; offset++){

let correlation = 0

for(let i=0;i<SIZE/2;i++){

correlation += Math.abs((buffer[i])-(buffer[i+offset]))

}

correlation = 1 - (correlation/(SIZE/2))

if(correlation > bestCorrelation){

bestCorrelation = correlation
bestOffset = offset

}

}

if(bestOffset > -1){

return sampleRate/bestOffset

}

return -1

}
async function loadSongReference(){

const params = new URLSearchParams(window.location.search)
const songName = params.get("song")

const response = await fetch("data/songs.json")
const songs = await response.json()

const song = songs.find(s => s.folder === songName)

if(song){
return song.referencePitch
}

return null

}
