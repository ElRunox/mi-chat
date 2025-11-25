const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivo HTML
app.use(express.static(__dirname + "/public"));

// Cuando un usuario se conecta
io.on("connection", (socket) => {
    console.log("Usuario conectado");

    // Cuando recibe un mensaje del cliente
    socket.on("mensaje", (msg) => {
        io.emit("mensaje", msg); // Enviar a todos
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
// Cuando carga la página, revisa si ya tiene nombre
window.addEventListener("DOMContentLoaded", () => {
    const savedUser = sessionStorage.getItem("username");
    if (savedUser) {
        startChat(savedUser);
    }
});

function setUsername() {
    const username = document.getElementById("usernameInput").value.trim();

    if (!username) {
        alert("Escribe un nombre válido");
        return;
    }

    // Guardar para toda la sesión (se borra al cerrar la pestaña)
    sessionStorage.setItem("username", username);
    startChat(username);
}

function startChat(username) {
    document.getElementById("usernameInput").style.display = "none";
    document.querySelector("button").style.display = "none";

    document.getElementById("chatContainer").style.display = "block";

    console.log("Bienvenido:", username);
};