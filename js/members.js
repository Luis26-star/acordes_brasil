fetch("data/members.json")
  .then(res => res.json())
  .then(members => {

    const container = document.getElementById("membersList")

    members.forEach(member => {

      const div = document.createElement("div")

      let colorClass = ""

      if (member.voice === "Sopran") colorClass = "sopran"
      if (member.voice === "Alt") colorClass = "alt"
      if (member.voice === "Tenor") colorClass = "tenor"
      if (member.voice === "Bass") colorClass = "bass"

      div.className = "member " + colorClass

      div.innerHTML = `
        <strong>${member.name}</strong><br>
        ${member.voice}
      `

      container.appendChild(div)

    })

  })
