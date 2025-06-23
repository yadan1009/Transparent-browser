const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setOpacity: (opacity) => ipcRenderer.send('set-opacity', opacity),
  getOpacity: () => ipcRenderer.send('get-opacity'),
  onOpacityUpdate: (callback) => ipcRenderer.on('current-opacity', callback),
  onOpacityReset: (callback) => ipcRenderer.on('opacity-reset', callback),
  
  // 收藏夹相关
  saveBookmarks: (bookmarks) => ipcRenderer.send('save-bookmarks', bookmarks),
  loadBookmarks: () => ipcRenderer.invoke('load-bookmarks'),
  
  // 密码相关
  verifyPassword: (password) => ipcRenderer.invoke('verify-password', password),
  setPassword: (password) => ipcRenderer.send('set-password', password)
}); 