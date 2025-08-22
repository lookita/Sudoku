// electron.js
import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// Necesario en ESM para obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

function createWindow() {
  console.log("🚀 Creando ventana...");

  const win = new BrowserWindow({
  width: 800,
  height: 600,
  x: 100,
  y: 100,
  show: true, // 🔴 mostrar de inmediato
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false
  }
});


  const indexPath = path.join(__dirname, "dist", "index.html");
  console.log("📄 Cargando:", indexPath);

  win.loadFile(indexPath);

  win.once("ready-to-show", () => {
    console.log("🪟 Ventana lista para mostrar");
    win.show();
  });

  win.on("closed", () => {
    console.log("❌ Ventana cerrada");
    mainWindow = null;
  });

  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }

  mainWindow = win;
}

app.whenReady().then(() => {
  console.log("✅ Electron está listo");
  createWindow();

  app.on("activate", () => {
    // En macOS, reabrir ventana si no hay ninguna
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    console.log("👋 Cerrando aplicación");
    app.quit();
  }
});
