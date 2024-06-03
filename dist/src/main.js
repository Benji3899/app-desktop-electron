"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const socket_io_client_1 = require("socket.io-client");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// Quitte l'application si elle est démarrée en mode 'squirrel'
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
// Crée une variable pour stocker la connexion WebSocket
let socket;
const createWindow = () => {
    // Crée la fenêtre principale de l'application.
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
        },
    });
    // and load the index.html of the app.
    /* if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
         mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
     } else {
         mainWindow.loadFile(
             path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
         );
     }*/
    // Charge le fichier index.html ou l'URL de développement
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL || `file://${path_1.default.join(__dirname, '../renderer/index.html')}`);
    // Ouvre les DevTools
    mainWindow.webContents.openDevTools();
    // Initialise la connexion WebSocket
    socket = (0, socket_io_client_1.io)("ws://localhost:3000");
    // Gestion des messages WebSocket
    const handleMessage = (message) => {
        console.log('Received message:', message);
        // Envoie les données à la fenêtre du rendu via IPC => Inter Process Communication
        mainWindow.webContents.send("socket-message", message);
    };
    // Écoute les messages WebSocket
    socket.on("message", handleMessage);
    // Désinscrit l'événement lors de la fermeture de la fenêtre
    mainWindow.on("close", () => {
        socket.off("message", handleMessage);
    });
    // Écoute les messages IPC du processus de rendu
    electron_1.ipcMain.on("socket-message", (_, message) => {
        socket.emit("message", message);
    });
};
// Crée la fenêtre lorsque Electron a fini l'initialisation
// INFO => Certaines API ne peuvent être utilisées qu'après cet événement.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
/*
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
*/
// Recrée une fenêtre lorsque l'icône de l'application est cliquée et qu'il n'y a pas d'autres fenêtres ouvertes (macOS)
electron_1.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
//# sourceMappingURL=main.js.map