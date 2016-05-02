// const ipc = require('electron').ipcRenderer;

export function openWindow(url) {
  ipc.send('open-url', {
    url,
  });
}
