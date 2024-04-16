<template>
  <div>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Tapez votre message...">
    <button @click="sendMessage">Envoyer</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '' // Stocke le nouveau message saisi par l'utilisateur
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') { // Vérifie si le message n'est pas vide
        this.$emit('message-sent', this.newMessage); // Émet un événement pour envoyer le message au composant parent
        this.newMessage = ''; // Efface le champ de saisie après l'envoi du message
      }
    }
  }
};
</script>
