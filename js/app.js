import { supabase } from "./supabase.js"
import * as player from "./player.js"

window.player = player

// INIT
player.initPlayer()
loadSongs()
loadMembers()
loadRehearsals()

// ================= SONGS =================
async function loadSongs() {
    const { data } = await supabase.from("songs").select("*")
    const el = document.getElementById("songSelect")
    if (!el) return
    el.innerHTML = ""
    data.forEach(s => {
        const opt = document.createElement("option")
        opt.value = s.folder
        opt.textContent = s.title
        el.appendChild(opt)
    })
}

// ================= MEMBERS =================
async function loadMembers() {
    const { data } = await supabase.from("members").select("*")
    const list = document.getElementById("membersList")
    if (!list) return
    list.innerHTML = ""
    data.forEach(m => {
        const div = document.createElement("div")
        div.className = "item"
        div.innerHTML = `${m.name} (${m.voice})
            <button onclick="deleteMember('${m.id}')">â</button>`
        list.appendChild(div)
    })
}

window.addMember = async () => {
    const name = document.getElementById("memberName")?.value
    const voice = document.getElementById("memberVoice")?.value
    if (!name) return
    await supabase.from("members").insert([{ name, voice }])
    loadMembers()
}

window.deleteMember = async (id) => {
    await supabase.from("members").delete().eq("id", id)
    loadMembers()
}

// ================= REHEARSALS =================
async function loadRehearsals() {
    const { data } = await supabase.from("rehearsals").select("*")
    const list = document.getElementById("rehearsalsList")
    if (!list) return
    list.innerHTML = ""
    data.forEach(r => {
        const div = document.createElement("div")
        div.className = "item"
        div.innerHTML = `${r.date} ${r.time} â ${r.location}`
        list.appendChild(div)
    })
}

window.addRehearsal = async () => {
    const date = document.getElementById("rehearsalDate")?.value
    const time = document.getElementById("rehearsalTime")?.value
    const location = document.getElementById("rehearsalLocation")?.value
    const songs = document.getElementById("rehearsalSongs")?.value
    if (!date || !time || !location) return
    await supabase.from("rehearsals").insert([{ date, time, location, songs }])
    loadRehearsals()
}

// ================= NAV =================
window.showSection = (id) => {
    const sections = ["player", "members", "rehearsals"]
    sections.forEach(s => {
        const el = document.getElementById(s + "Section")
        if (el) el.style.display = s === id ? "block" : "none"
    })
}
