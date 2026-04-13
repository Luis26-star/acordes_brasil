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
