import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {io, Socket} from "socket.io-client";

/******
Le rôle du processus principal est de créer et de gérer les fenêtres d'application avec le module BrowserWindow.
Chaque instance de la classe BrowserWindow crée une fenêtre d’application qui charge une page Web
dans un processus de rendu distinct. Vous pouvez interagir avec ce contenu Web à partir du processus principal
à l’aide de l’objet webContents de la fenêtre.
*****/

// Dans ce fichier, vous pouvez inclure le reste du processus principal spécifique de votre application
// Vous pouvez également les placer dans des fichiers séparés et les importer ici.

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// Quitte l'application si elle est démarrée en mode 'squirrel'
if (require('electron-squirrel-startup')) {
    app.quit();
}

// Crée une variable pour stocker la connexion WebSocket
let socket: Socket;

const createWindow = () => {
    // Crée la fenêtre principale de l'application.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Charge le fichier index.html ou l'URL de développement
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL || `file://${path.join(__dirname, '../renderer/index.html')}`);

    // Ouvre les DevTools
    mainWindow.webContents.openDevTools();

    // Initialise la connexion WebSocket
    socket = io("ws://localhost:3000");

    // Gestion des messages WebSocket
    const handleMessage = (message: unknown) => {
        console.log('BAC Received message:', message);

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
    ipcMain.on("socket-message", (_, message) => {
        console.log('BAC sent message:', message);
        socket.emit("message", message);
    });
};

// Crée la fenêtre lorsque Electron a fini l'initialisation
// INFO => Certaines API ne peuvent être utilisées qu'après cet événement.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });


// Recrée une fenêtre lorsque l'icône de l'application est cliquée et qu'il n'y a pas d'autres fenêtres ouvertes (macOS)
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


