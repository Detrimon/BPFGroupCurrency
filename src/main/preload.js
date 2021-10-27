const electron = require('electron');
function init() {
  // add global variables to your web page
  window.isElectron = true;
  window.ipcRenderer = electron.ipcRenderer;
}

init();
