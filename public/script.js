const socket = io();

// Al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const saved = sessionStorage.getItem("username");
    if (saved) {
        startChat(saved);
    }
});

// Guardar nombre de usuario
function setUsername() {
    const username = document.getElementById("usernameInput").value.trim();

    if (!username) return alert("Escribe un nombre válido");

    sessionStorage.setItem("username", username);
    startChat(username);
}

// Mostrar chat y ocultar el login
function startChat(username) {
    document.getElementById("usernameInput").style.display = "none";
    document.querySelector("button").style.display = "none";

    document.getElementById("chatContainer").style.display = "block";
}

// Enviar mensaje
function enviar() {
    const user = sessionStorage.getItem("username");
    const texto = document.getElementById("texto").value;

    if (!texto.trim()) return;

    socket.emit("mensaje", `${user}: ${texto}`);
    document.getElementById("texto").value = "";
}

// Recibir mensaje
socket.on("mensaje", (msg) => {
    const div = document.getElementById("mensajes");
    div.innerHTML += `<p>${msg}</p>`;
});
// Mostrar vista previa automática
document.getElementById("imgInput").addEventListener("input", function () {
    const url = this.value.trim();
    const preview = document.getElementById("previewImg");

    if (url.length < 5) {
        preview.style.display = "none";
        return;
    }

    preview.src = url;
    preview.style.display = "block";
});

// Guardar nombre y foto
function setUsername() {
    const username = document.getElementById("usernameInput").value.trim();
    const imgURL = document.getElementById("imgInput").value.trim();

    if (!username) {
        alert("Escribe un nombre válido");
        return;
    }

    if (!imgURL) {
        alert("Pega un link de imagen");
        return;
    }

    // Guardamos en sessionStorage para toda la sesión
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("avatar", imgURL);

    // Ocultamos el login
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("chatContainer").style.display = "block";
}
