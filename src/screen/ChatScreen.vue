<template>
  <div>
    <!-- Composant pour afficher la liste des messages -->
    <message-list :messages="messages" />

    <!-- Composant pour saisir et envoyer un nouveau message -->
    <message-input @message-sent="handleMessageSent" />
  </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue';
import MessageList from '../components/MessageList.vue';
import MessageInput from '../components/MessageInput.vue';

export default defineComponent({
  components: {
    MessageList,
    MessageInput
  },
  setup() {
    // Récupère la connexion Socket.io fournie par SocketProvider
    const socket = inject('socket');

    // Vérifie si la connexion Socket.io est disponible
    if (!socket) {
      console.error("Socket not found!");
      return;
    }

    // Initialise la liste des messages
    const messages = ref([]);

    // Écoute les messages WebSocket
    socket.on('message', (message) => {
      messages.value.push({ content: message });
      console.log('Received message:', message);
    });

    // Gère l'envoi de messages
    const handleMessageSent = (message) => {
      if (socket) {
        socket.emit('message', message); // Envoie le message au serveur via Socket.io

        // Ajoute le message à la liste des messages localement
        messages.value.push({ content: message });
        console.log('Message sent:', message);
      }
    };

    return {
      messages,
      handleMessageSent
    };
  }
});


//
// import MessageList from '../components/MessageList.vue';
// import MessageInput from '../components/MessageInput.vue';
// import { inject } from 'vue';

// export default {
//   // components: {MessageList},
//   components: {
//     MessageList,
//     MessageInput
//   },
//   data() {
//     return {
//       messages: [] // Initialise la liste des messages
//     };
//   },
//   created() {
//     const socket = inject('socket'); // Récupère la connexion Socket.io fournie par SocketProvider
//
//     if (!socket) {
//       console.error("Socket not found!");
//       return;
//     }
//
//     socket.on('message', (message) => {
//       this.messages.push({ content: message });
//       console.log('Received message:', message);
//     });
//   },
//   methods: {
//     handleMessageSent(message) {
//       const socket = inject('socket'); // Récupère la connexion Socket.io
//       if (socket) {
//         socket.emit('message', message); // Envoie le message au serveur via Socket.io
//
//         // Ajoute le message à la liste des messages localement
//         this.messages.push({content: message});
//         console.log('Message sent:', message);
//       }
//     }
//   }
// };


</script>


<style scoped>
</style>
