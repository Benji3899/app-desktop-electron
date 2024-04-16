<template>
  <div>
    <message-list :messages="messages" />
    <message-input @message-sent="handleMessageSent" />
  </div>
</template>

<script>
import MessageList from '../components/MessageList.vue';
import MessageInput from '../components/MessageInput.vue';

export default {
  components: {
    MessageList,
    MessageInput
  },
  data() {
    return {
      messages: [] // Stocke la liste des messages
    };
  },
  methods: {
    handleMessageSent(message) {
      const now = new Date();
      const lastMessage = this.messages[this.messages.length - 1];
      const newMessage = {
        content: messageContent,
        time: now.toLocaleTimeString([], {hour: '2-digit', minute: "2-digit" }), //  formatage de l'heure
        date: now.toLocaleDateString(), // Formatage de la date
        showDate: false // Par défaut, ne pas afficher la date
      };
      if (!lastMessage || newMessage.date !== lastMessage.date) {
        newMessage.showDate = true; // Afficher la date si c'est le premier message de la journée
      }
        this.messages.push({ content: message }); // Ajoute le message à la liste des messages
    }
  }
};
</script>

<style scoped>
/* Ajoute ici tes styles CSS pour la page de chat */
</style>
