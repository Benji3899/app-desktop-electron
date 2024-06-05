<template>
  <div>
    <!-- Composant pour afficher la liste des messages -->
    <message-list :messages="messages" />

    <!-- Composant pour saisir et envoyer un nouveau message -->
    <message-input @message-sent="handleMessageSent" />
  </div>
</template>

<script>
import MessageList from '../components/MessageList.vue';
import MessageInput from '../components/MessageInput.vue';
import { inject } from 'vue';

export default {
  // components: {MessageList},
  components: {
    MessageList,
    MessageInput
  },
  data() {
    return {
      messages: [] // Initialise la liste des messages
    };
  },
  created() {
    const socket = inject('socket'); // Récupère la connexion Socket.io fournie par SocketProvider

    if (!socket) {
      console.error("Socket not found!");
      return;
    }

    socket.on('message', (message) => {
      this.messages.push({ content: message });
      console.log('Received message:', message);
    });
  },
  methods: {
    handleMessageSent(message) {
      const socket = inject('socket'); // Récupère la connexion Socket.io
      if (socket) {
        socket.emit('message', message); // Envoie le message au serveur via Socket.io

        // Ajoute le message à la liste des messages localement
        this.messages.push({content: message});
        console.log('Message sent:', message);
      }
    }
  }
};

//   mounted() {
//     const ipc = inject('ipc'); // Récupère la connexion IPC fourni par IpcProvider
//
//     /***** abstraire IPC dans ChatScreen.vue *****/
//     // Écoute des messages IPC du processus principal
//     window.IPC.onMessageFromMain((message) => {
//       console.log("Received message from main:", message);
//       // Gère le message reçu du processus principal
//
//       // Ajoute le message à la liste des messages
//       this.messages.push({ content: message });
//     });
//   },
//   components: {
//     MessageList,
//     MessageInput
//   },
//   data() {
//     return {
//       messages: [] // Initialise la liste des messages
//     };
//   },
//
//   methods: {
//     handleMessageSent(message) {
//       // Envoie le message au processus principal via IPC
//       window.IPC.sendMessageToMain(message);
//
//       // Affichage du message dans la console du navigateur
//       console.log("Message sent:", message);
//
//       // Ajoute le message à la liste des messages
//       //this.messages.push({ content: message });
//     }
//   }
// };
</script>


<style scoped>
</style>
