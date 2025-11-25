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

    sessionStorage.setItem("username", username);
    startChat(username);
}

function startChat(username) {
    document.getElementById("usernameInput").style.display = "none";
    document.querySelector("button").style.display = "none";

    document.getElementById("chatContainer").style.display = "block";

    console.log("Bienvenido:", username);
}
