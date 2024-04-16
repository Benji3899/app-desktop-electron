<template>
  <div class="message-list">
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        <div>
          <span v-if="message.showDate">{{ messsage.date }}</span> <!-- affiche la date si c'est le premier message de la journée -->
          <span>{{ message.time }}</span> <!-- affiche l'heure du message -->
        </div>
        {{ message.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  }
};
</script>


<style scoped></style>