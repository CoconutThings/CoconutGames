let scene, camera, renderer, avatarParts = {};

function init3DAvatar() {
  let container = document.getElementById("avatar3d");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(200, 200);

  container.appendChild(renderer.domElement);

  // Body
  let body = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );

  // Head
  let head = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshBasicMaterial({ color: 0xffcc99 })
  );

  head.position.y = 1.3;

  scene.add(body);
  scene.add(head);

  avatarParts.body = body;
  avatarParts.head = head;

  camera.position.z = 3;

  function animate() {
    requestAnimationFrame(animate);
    body.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}

function update3DAvatar() {
  let bodyColor = document.getElementById("bodyColor").value;
  let headColor = document.getElementById("headColor").value;

  avatarParts.body.material.color.set(bodyColor);
  avatarParts.head.material.color.set(headColor);

  localStorage.setItem("avatar3D", JSON.stringify({ bodyColor, headColor }));
}
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

function getCoins() {
  return parseInt(localStorage.getItem("coins") || "0");
}

function updateCoinsDisplay() {
  document.getElementById("coins").innerText = getCoins() + " CO$";
}

function earnCoins() {
  let coins = getCoins() + 10;
  localStorage.setItem("coins", coins);
  updateCoinsDisplay();
}

let grid = [];
let size = 10;

function initBuilder() {
  let canvas = document.getElementById("builderCanvas");
  if (!canvas) return;

  let ctx = canvas.getContext("2d");

  for (let y = 0; y < size; y++) {
    grid[y] = [];
    for (let x = 0; x < size; x++) {
      grid[y][x] = 0;
    }
  }

  canvas.addEventListener("click", (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / 30);
    let y = Math.floor((e.clientY - rect.top) / 30);

    grid[y][x] = 1;
    draw();
  });

  function draw() {
    ctx.clearRect(0, 0, 300, 300);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        ctx.strokeRect(x * 30, y * 30, 30, 30);
        if (grid[y][x]) {
          ctx.fillRect(x * 30, y * 30, 30, 30);
        }
      }
    }
  }

  draw();
}

function saveMap() {
  localStorage.setItem("myGame", JSON.stringify(grid));
  alert("Game saved!");
}

function saveCharacter() {
  let data = localStorage.getItem("avatar3D");
  let chars = JSON.parse(localStorage.getItem("characters") || "[]");

  chars.push(data);
  localStorage.setItem("characters", JSON.stringify(chars));

  alert("Character saved!");
}

function loadCharacter() {
  let chars = JSON.parse(localStorage.getItem("characters") || "[]");
  if (chars.length === 0) return alert("No characters!");

  let char = JSON.parse(chars[0]);

  avatarParts.body.material.color.set(char.bodyColor);
  avatarParts.head.material.color.set(char.headColor);
}
