import {Server} from "socket.io";
import User from "./user";
import Room from "./room";
// @ts-ignore
import Message from "./message";

// console.log("hello world");
// Fonction principale pour démarrer le serveur
// function main(){
    // Crée une nouvelle instance de Socket.io avec la configuration CORS
    const io = new Server({
        cors: {
            origin: "*",
        },
    });

// Liste des salons et structure pour stocker les messages de chaque salle
const rooms: { [roomId: string]: Room } = {};
const roomsMessages: { [roomId: string]: Message[] } = {
    "room1": [],
    "room2": [],
    "room3": [],
    "room4": [],
    "room5": [],
    // Ajoutez d'autres salles de discussion au besoin
};

function main() {
    // Écoute les connexions entrantes
    io.on("connection", (socket) => {
        console.log("New connection:", socket.id);

        // Création d'un nouvel utilisateur
        const user = new User(socket.id, `User-${socket.id}`);

        // Gestion des messages entrants sur la connexion
        socket.on("joinRoom", (roomId: string) => {
            let room = rooms[roomId];
            if (!room) {
                // Si le salon n'existe pas, le créer
                room = new Room();
                rooms[roomId] = room;
            }
            room.addUser(user);
            console.log(`${user.name} joined room ${roomId}`);
            socket.join(roomId);

            // Envoyer les messages existants de la salle à l'utilisateur
            socket.emit("roomMessages", roomsMessages[roomId]);
        });

        // Gestion de l'événement pour quitter une salle
        socket.on("leaveRoom", (roomId: string) => {
            const room = rooms[roomId];
            if (room) {
                room.removeUser(user.id);
                console.log(`${user.name} left room ${roomId}`);
                socket.leave(roomId);
            }
        });

        // Gestion des messages entrants sur la connexion
        socket.on("message", (message) => {
            console.log('received message:', message);

            if (roomsMessages[message.roomId]) {
                roomsMessages[message.roomId].push(message);
            } else {
                roomsMessages[message.roomId] = [message];
            }

            // Émet le message à tous les sockets connectés dans la même salle
            io.to(message.roomId).emit("message", message);
        });
    });

    // Démarre le serveur sur le port 3000
    // @ts-ignore
    io.listen(3000, () => {
        console.log("Server started on port 3000");
    });

    io.on('error', (error) => {
        console.error('Socket.io error:', error);
    });
}


// Appelle la fonction principale pour démarrer le serveur
main();