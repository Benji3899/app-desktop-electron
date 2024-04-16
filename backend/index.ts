import {Server} from "socket.io";

// console.log("hello world");

function main(){
    const io = new Server({
        cors: {
            origin: "*",
        },
    });

    // Ecout conncections entrantes
    io.on("connection", (socket)=>{
       console.log("New connection:", socket.id)

        // Ecoute message entrant sur la connection
        socket.on("message", (message)=> {
            console.log('received message:', message);

            // Emet le message à tous les sockets
            io.emit("message", message);
        });
    });
    io.listen(3000);

    console.log("Server started on port 3000")
}

main();