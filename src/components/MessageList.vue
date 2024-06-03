<template>
  <div class="message-list">
    <ul>
      <li v-for="(message, index) in messages" :key="index">
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
      default: () => [] // Définit un tableau vide comme valeur par défaut
    }
  }
};
</script>


<style scoped></style>