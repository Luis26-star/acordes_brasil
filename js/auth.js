const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (email === "admin@acordes-brasil.de" && password === "Acordes2025") {
    window.location.href = "../karaoke.html";
  } else {
    alert("Falsche Daten");
  }
});
