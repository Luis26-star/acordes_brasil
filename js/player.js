function getSong(){

const params = new URLSearchParams(window.location.search)

return params.get("s")

}

const song = getSong()

if(song){

document.getElementById("soprano").src = "audio/"+song+"/soprano.mp3"
document.getElementById("alt").src = "audio/"+song+"/alt.mp3"
document.getElementById("tenor").src = "audio/"+song+"/tenor.mp3"
document.getElementById("bass").src = "audio/"+song+"/bass.mp3"

}

function setVolume(voice,volume){

document.getElementById(voice).volume = volume

}

function setTempo(speed){

document.querySelectorAll("audio").forEach(audio=>{

audio.playbackRate = speed

})

}

let loopInterval

function startLoop(){

const start = document.getElementById("loopStart").value
const end = document.getElementById("loopEnd").value

loopInterval = setInterval(()=>{

document.querySelectorAll("audio").forEach(audio=>{

if(audio.currentTime >= end){

audio.currentTime = start

}

})

},200)

}

function stopLoop(){

clearInterval(loopInterval)

}
const params = new URLSearchParams(window.location.search)
const song = params.get("s")

document.getElementById("songTitle").innerText = song.replaceAll("_"," ")

const voices = ["soprano","alto","tenor","bass"]

voices.forEach(v=>{
document.getElementById(v).src =
"audio/"+song+"/"+v+".mp3"
})

function playAll(){

voices.forEach(v=>{
document.getElementById(v).play()
})

}

function stopAll(){

voices.forEach(v=>{
const a=document.getElementById(v)
a.pause()
a.currentTime=0
})

}

function playVoice(voice){

stopAll()
document.getElementById(voice).play()

}

function setVolume(voice,volume){

document.getElementById(voice).volume = volume

}

function setTempo(speed){

voices.forEach(v=>{
document.getElementById(v).playbackRate = speed
})

}

let loopInterval = null

function startLoop(){

const start = document.getElementById("loopStart").value
const end = document.getElementById("loopEnd").value

loopInterval = setInterval(()=>{

voices.forEach(v=>{

const audio = document.getElementById(v)

if(audio.currentTime >= end){
audio.currentTime = start
}

})

},200)

}

function stopLoop(){

clearInterval(loopInterval)

}

function seek(value){

const audio = document.getElementById("soprano")

audio.currentTime = (value/100)*audio.duration

}

setInterval(()=>{

const audio = document.getElementById("soprano")

if(audio.duration){

const percent = (audio.currentTime/audio.duration)*100

document.getElementById("progress").value = percent

}

},500)
