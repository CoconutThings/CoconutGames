// ===== AUTH SYSTEM =====

function signup() {
  let user = document.getElementById("signupUser").value;
  let pass = document.getElementById("signupPass").value;

  localStorage.setItem(user, pass);
  document.cookie = "user=" + user;

  alert("Account created!");
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let stored = localStorage.getItem(user);

  if (stored === pass) {
    document.cookie = "user=" + user;
    window.location.href = "game.html";
  } else {
    alert("Wrong login!");
  }
}

function logout() {
  document.cookie = "user=;";
  window.location.href = "index.html";
}

// ===== CHARACTER =====

function updateAvatar() {
  let color = document.getElementById("colorPicker").value;
  document.getElementById("avatar").style.background = color;

  localStorage.setItem("avatarColor", color);
}

window.onload = () => {
  let color = localStorage.getItem("avatarColor");
  if (color) {
    document.getElementById("avatar").style.background = color;
  }

  startGame();
};

// ===== SIMPLE GAME =====

function startGame() {
  let canvas = document.getElementById("gameCanvas");
  if (!canvas) return;

  let ctx = canvas.getContext("2d");

  let x = 50;

  function loop() {
    ctx.clearRect(0, 0, 500, 300);
    ctx.fillStyle = "lime";
    ctx.fillRect(x, 150, 30, 30);

    x += 1;
    requestAnimationFrame(loop);
  }

  loop();
}

// ===== VIDEO PLAYER =====

function loadVideo() {
  let url = document.getElementById("videoURL").value;

  document.getElementById("videoContainer").innerHTML =
    `<iframe width="300" height="200" src="${url}" frameborder="0" allowfullscreen></iframe>`;
}

// ===== LOCAL MULTIPLAYER =====

window.addEventListener("storage", (event) => {
  if (event.key === "playerPos") {
    console.log("Other player moved:", event.newValue);
  }
});

function movePlayer(pos) {
  localStorage.setItem("playerPos", pos);
}
