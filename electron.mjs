import { app, BrowserWindow } from 'electron';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true
    }
  });

  // Cargar la app desde el servidor de Vite
  win.loadURL('http://localhost:5174');

  // Opcional: abrir DevTools para ver errores
  // win.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  app.quit();
});
