const app = require('app');
const Browser = require('browser-window');
const ipc = require("electron").ipcMain;
const server = require('./server/index.js').serverInit;
const streamOn = require('./server/index.js').streamOn;

let mainWindow = null;
const appStart = () => {
  // app.on('window-all-closed', () => app.quit());
  // app.on('ready', () => {
  mainWindow = new Browser({
    width: 800,
    height: 700,
  });
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};
server(appStart, { stream: true });
streamOn(() => {
  console.log('connected');
}, 'connected', { setStream: true });

streamOn(m => console.log('connect'), 'connect');
streamOn(m => console.log('disconnect'), 'disconnect');
streamOn(m => console.log('reconnect'), 'reconnect');
streamOn(m => console.log('error'), 'error');
streamOn(m => console.log('message', m), 'message');



ipc.on('open-url', (sys, data) => {
  const url = data.url;
  const windowSize = data.windowSize || {
    width: 350,
    height: 300,
  };
  const subWindow = new Browser(windowSize);
  subWindow.loadURL(url);
});
