const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (email === "chor@acordes.de" && password === "1234") {
    window.location.href = "../karaoke.html";
  } else {
    alert("Falsche Daten");
  }
});
