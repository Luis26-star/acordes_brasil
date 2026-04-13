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
