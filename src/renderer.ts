/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import { createApp } from 'vue';
import ChatScreen from './screen/ChatScreen.vue';
import './index.css';

createApp(ChatScreen).mount('#root')

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", ()=> {
    console.log("Connected to server");
});

socket.addEventListener("message", (event)=>{
    console.log("Received message:", event.data);
});

socket.addEventListener("close", ()=>{
    console.log("Disconnect from server");
});

socket.addEventListener("error", (error)=>{
    console.error("An error occurred:", error);
});

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
