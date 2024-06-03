"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const ChatScreen_vue_1 = __importDefault(require("./screen/ChatScreen.vue"));
require("./index.css");
// Crée et monte l'application Vue
(0, vue_1.createApp)(ChatScreen_vue_1.default).mount('#root');
console.log('👋 This message is being logged by "renderer.ts", included via Vite');
/*
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
});*/
//# sourceMappingURL=renderer.js.map