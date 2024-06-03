import { createApp } from 'vue';
import ChatScreen from './screen/ChatScreen.vue';
import './index.css';

// Crée et monte l'application Vue
createApp(ChatScreen).mount('#root')

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

