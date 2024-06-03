// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer} from "electron";

// Expose les fonctions IPC à l'environnement de rendu
contextBridge.exposeInMainWorld('IPC', {
    // Fonction pour envoyer un message IPC au processus principal
    sendMessageToMain: (message: unknown) => {
        ipcRenderer.send("socket-message", message);
    },

    // Fonction pour écouter les messages IPC du processus principal
    onMessageFromMain: (callback: (message: unknown) => void) => {
        ipcRenderer.on("socket-message", (_, message: unknown) => {
            callback(message);
        });
    }
});

