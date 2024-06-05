<template>
  <SocketProvider>
    <ChatScreen />
  </SocketProvider>
</template>

<script>
import SocketProvider from './providers/SocketProvider.vue';
import ChatScreen from './screen/ChatScreen.vue';

export default {
  components: {
    SocketProvider,
    ChatScreen
  }
};
</script>

<style scoped>
</style>
