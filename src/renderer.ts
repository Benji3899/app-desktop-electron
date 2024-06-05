import { createApp } from 'vue';
import ChatScreen from './screen/ChatScreen.vue';
import './index.css';
import SocketProvider from "./providers/SocketProvider.vue";

// Crée et monte l'application Vue
// createApp(ChatScreen).mount('#root')
const app = createApp({
    components: { SocketProvider, ChatScreen },
    template: `
    <SocketProvider>
      <ChatScreen />
    </SocketProvider>
  `
});
app.mount('#root');

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

