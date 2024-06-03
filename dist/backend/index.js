"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
// console.log("hello world");
// Fonction principale pour démarrer le serveur
function main() {
    // Crée une nouvelle instance de Socket.io avec la configuration CORS
    const io = new socket_io_1.Server({
        cors: {
            origin: "*",
        },
    });
    // Écoute les connexions entrantes
    io.on("connection", (socket) => {
        console.log("New connection:", socket.id);
        // Écoute les messages entrants sur la connexion
        socket.on("message", (message) => {
            console.log('received message:', message);
            // Émet le message à tous les sockets connectés
            io.emit("message", message);
        });
    });
    // Démarre le serveur sur le port 3000
    io.listen(3000);
    console.log("Server started on port 3000");
}
// Appelle la fonction principale pour démarrer le serveur
main();
//# sourceMappingURL=index.js.map