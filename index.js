const app = require('app');
const Browser = require('browser-window');

const server = require('./server/index.js');
let mainWindow = null;
const appStart = () => {
  app.on('window-all-closed', () => app.quit());
  // app.on('ready', () => {
  mainWindow = new Browser({
    width: 800,
    height: 700,
  });
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
  // });
};
server(appStart);
