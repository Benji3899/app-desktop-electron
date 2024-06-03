<template>
</template>

<script>
import { provide } from 'vue';
import { io } from "socket.io-client";
export default {
  created() {
    // Crée une connexion WebSocket avec le serveur
    const socket = io("ws://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (event) => {
      console.log("Received message:", event.data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("error", (error) => {
      console.error("An error occurred:", error);
    });

    // Fournit la connexion WebSocket à toute l'application
    provide('socket', socket);
  }
};
</script>
