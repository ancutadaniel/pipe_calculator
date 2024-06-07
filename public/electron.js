const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
  console.log('Creating window...');
  const { default: isDev } = await import('electron-is-dev');
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3001'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  console.log(`Loading URL: ${startUrl}`);
  win.loadURL(startUrl)
    .then(() => console.log("App loaded successfully"))
    .catch((error) => console.error("Failed to load app:", error));
}

app.whenReady().then(() => {
  console.log("App is ready");
  createWindow();
  app.on('activate', () => {
    console.log("App activated");
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  console.log("All windows closed");
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
