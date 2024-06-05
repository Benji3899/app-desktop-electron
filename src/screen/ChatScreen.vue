<template>
  <div>
    <div>
      <label for="room-select">Select Room:</label>
      <select id="room-select" v-model="selectedRoom" @change="changeRoom">
        <option value="room1">Room 1</option>
        <option value="room2">Room 2</option>
        <option value="room3">Room 3</option>
        <option value="room4">Room 4</option>
        <option value="room5">Room 5</option>
      </select>
    </div>
    <!-- Composant pour afficher la liste des messages -->
<!--    <message-list :messages="messages" />-->
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
    const selectedRoom = ref('room1');
    const messages = ref([]);

    // Vérifie si la connexion Socket.io est disponible
    if (!socket) {
      console.error("Socket not found!");
      return;
    }

    // Écoute les messages WebSocket
    socket.on('message', (message) => {
      if (message.roomId === selectedRoom.value) {
        messages.value.push(message);
      }
      console.log('Received message:', message);
    });

    // Écoute les messages de la salle lors de la connexion
    socket.on('roomMessages', (roomMessages) => {
      messages.value = roomMessages;
    });

    // Liste des messages de la salle de discussion sélectionnée
    const selectedRoomMessages = ref([]);

    // Écoute les messages WebSocket
    socket.on('message', (message) => {
      // Ajoute le message à la liste des messages de la salle sélectionnée
      selectedRoomMessages.value.push({ content: message });
      console.log('Received message:', message);
    });

    const handleMessageSent = (messageContent) => {
      const message = { roomId: selectedRoom.value, content: messageContent, timestamp: new Date().toISOString() };
      socket.emit('message', message); // Envoie le message au serveur via Socket.io
    };

    const changeRoom = () => {
      socket.emit('leaveRoom', selectedRoom.value);
      socket.emit('joinRoom', selectedRoom.value);
    };

    // Rejoindre la salle initiale
    socket.emit('joinRoom', selectedRoom.value);

    return{
      selectedRoom,
      messages,
      handleMessageSent,
      changeRoom
    }
  }
});

</script>


<style scoped>
</style>
