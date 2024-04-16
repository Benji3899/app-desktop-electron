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
      this.messages.push({ content: message }); // Ajoute le message à la liste des messages
    }
  }
};
</script>

<style scoped>
/* Ajoute ici tes styles CSS pour la page de chat */
</style>
