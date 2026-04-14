fetch("data/members.json")
.then(res => res.json())
.then(members => {

const voices = {
"Sopran":0,
"Alt":0,
"Tenor":0,
"Bass":0
}

members.forEach(m => {

if(voices[m.voice] !== undefined){
voices[m.voice]++
}

})

const container = document.getElementById("members")

container.innerHTML = `

<div class="voice-card">
<h2>Sopran</h2>
<p>${voices.Sopran} Sängerinnen</p>
</div>

<div class="voice-card">
<h2>Alt</h2>
<p>${voices.Alt} Sängerinnen</p>
</div>

<div class="voice-card">
<h2>Tenor</h2>
<p>${voices.Tenor} Sänger</p>
</div>

<div class="voice-card">
<h2>Bass</h2>
<p>${voices.Bass} Sänger</p>
</div>

`

})
