const ipc = require('electron').ipcRenderer;
export function openWindow(url, windowSize?) {
  console.log(url)
  ipc.send('open-url', {
    url,
    windowSize,
  });
}
