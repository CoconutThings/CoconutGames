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
