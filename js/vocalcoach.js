let audioContext
let analyser
let microphone
let dataArray
let animation

async function startListening(){

audioContext = new AudioContext()

const stream = await navigator.mediaDevices.getUserMedia({audio:true})

microphone = audioContext.createMediaStreamSource(stream)

analyser = audioContext.createAnalyser()

analyser.fftSize = 2048

microphone.connect(analyser)

dataArray = new Float32Array(analyser.fftSize)

update()

}

function stopListening(){

cancelAnimationFrame(animation)

if(audioContext){
audioContext.close()
}

}

function update(){

analyser.getFloatTimeDomainData(dataArray)

const pitch = detectPitch(dataArray,audioContext.sampleRate)

const volume = getVolume(dataArray)

document.getElementById("pitch").innerText =
"Tonhöhe: " + Math.round(pitch) + " Hz"

document.getElementById("volume").innerText =
"Lautstärke: " + volume.toFixed(2)

drawWaveform()

animation = requestAnimationFrame(update)

}

function getVolume(buffer){

let sum = 0

for(let i=0;i<buffer.length;i++){

sum += buffer[i]*buffer[i]

}

return Math.sqrt(sum/buffer.length)

}

function detectPitch(buffer,sampleRate){

let SIZE = buffer.length

let bestOffset = -1
let bestCorrelation = 0

for(let offset=0; offset < SIZE/2; offset++){

let correlation = 0

for(let i=0;i<SIZE/2;i++){

correlation += Math.abs(buffer[i] - buffer[i+offset])

}

correlation = 1 - (correlation/(SIZE/2))

if(correlation > bestCorrelation){

bestCorrelation = correlation
bestOffset = offset

}

}

if(bestOffset > -1){

return sampleRate / bestOffset

}

return 0

}

function drawWaveform(){

const canvas = document.getElementById("visualizer")

if(!canvas) return

const ctx = canvas.getContext("2d")

ctx.fillStyle = "#0B1F3B"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.strokeStyle = "#1DB954"
ctx.beginPath()

for(let i=0;i<dataArray.length;i++){

const x = (i/dataArray.length)*canvas.width
const y = (dataArray[i]*100)+100

if(i===0){
ctx.moveTo(x,y)
}else{
ctx.lineTo(x,y)
}

}

ctx.stroke()

}
