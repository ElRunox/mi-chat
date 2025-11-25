const socket = io();

// Al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const savedUser = sessionStorage.getItem("username");
    const savedAvatar = sessionStorage.getItem("avatar");

    if (savedUser && savedAvatar) {
        startChat(savedUser, savedAvatar);
    }
});

// Guardar nombre de usuario
function setUsername() {
    const username = document.getElementById("usernameInput").value.trim();
    const avatar = document.getElementById("imgInput").value.trim();

    if (!username) return alert("Escribe un nombre válido");
    if (!avatar) return alert("Pega el link de tu imagen");

    sessionStorage.setItem("username", username);
    sessionStorage.setItem("avatar", avatar);

    startChat(username, avatar);
}

// Mostrar chat y ocultar el login
function startChat(username, avatar) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("chatContainer").style.display = "block";
}

// Enviar mensaje
function enviar() {
    const user = sessionStorage.getItem("username");
    const avatar = sessionStorage.getItem("avatar");
    const texto = document.getElementById("texto").value;

    if (!texto.trim()) return;

    socket.emit("mensaje", {
        user: user,
        avatar: avatar,
        texto: texto
    });

    document.getElementById("texto").value = "";
}

// Recibir mensaje
socket.on("mensaje", (data) => {
    const div = document.getElementById("mensajes");

    div.innerHTML += `
        <div style="margin-bottom:12px; padding:5px;">

            <!-- FOTO + NOMBRE -->
            <div style="display:flex; align-items:center; gap:8px;">
                <img src="${data.avatar}" 
                     style="width:30px;height:30px;border-radius:5px;">
                <strong>${data.user}</strong>
            </div>

            <!-- MENSAJE ABAJO -->
            <p style="margin:5px 0 0 38px;">${data.texto}</p>

        </div>
    `;
});
