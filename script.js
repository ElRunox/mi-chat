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

