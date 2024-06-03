"use strict";
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose les fonctions IPC à l'environnement de rendu
electron_1.contextBridge.exposeInMainWorld('IPC', {
    // Fonction pour envoyer un message IPC au processus principal
    sendMessageToMain: (message) => {
        electron_1.ipcRenderer.send("message-to-main", message);
    },
    // Fonction pour écouter les messages IPC du processus principal
    onMessageFromMain: (callback) => {
        electron_1.ipcRenderer.on("message-from-main", (_, message) => {
            callback(message);
        });
    }
});
/*contextBridge.exposeInMainWorld('MessageAPI', {
    addMessageListener: (callback: (message: unknown)=> void) => {
        const wrappedCallback = (_: IpcRendererEvent, message: unknown) =>
            callback(message);
        ipcRenderer.on("socket-message", wrappedCallback);
        return () => ipcRenderer.off("socket-message", wrappedCallback);
    },
    send(message: unknown){
        ipcRenderer.send("socket-message", message);
    },
})*/
//# sourceMappingURL=preload.js.map