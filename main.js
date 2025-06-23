const { app, BrowserWindow, Menu, ipcMain, session, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let currentOpacity = 1.0;

// 数据存储路径
const userDataPath = app.getPath('userData');
const bookmarksFile = path.join(userDataPath, 'bookmarks.json');
const settingsFile = path.join(userDataPath, 'settings.json');

// 默认设置
let settings = {
  password: '123456' // 默认密码
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      webSecurity: false, // 允许跨域请求
      allowRunningInsecureContent: true, // 允许不安全内容
      experimentalFeatures: true
    },
    titleBarStyle: 'hiddenInset',
    transparent: true,
    vibrancy: 'under-window',
    visualEffectState: 'active'
  });

  mainWindow.loadFile('index.html');
  createMenu();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createMenu() {
  const template = [
    {
      label: '透明浏览器',
      submenu: [
        {
          label: '关于透明浏览器',
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '重做', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '全选', role: 'selectAll' }
      ]
    },
    {
      label: '视图',
      submenu: [
        { label: '重新加载', role: 'reload' },
        { label: '强制重新加载', role: 'forceReload' },
        { label: '开发者工具', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: '实际大小', role: 'resetZoom' },
        { label: '放大', role: 'zoomIn' },
        { label: '缩小', role: 'zoomOut' },
        { type: 'separator' },
        { label: '全屏', role: 'togglefullscreen' }
      ]
    },
    {
      label: '窗口',
      submenu: [
        { label: '最小化', role: 'minimize' },
        { label: '关闭', role: 'close' },
        { type: 'separator' },
        {
          label: '透明度',
          submenu: [
            {
              label: '100%',
              click: () => setOpacity(1.0)
            },
            {
              label: '90%',
              click: () => setOpacity(0.9)
            },
            {
              label: '80%',
              click: () => setOpacity(0.8)
            },
            {
              label: '70%',
              click: () => setOpacity(0.7)
            },
            {
              label: '60%',
              click: () => setOpacity(0.6)
            },
            {
              label: '50%',
              click: () => setOpacity(0.5)
            }
          ]
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function setOpacity(opacity) {
  // 确保透明度在有效范围内
  opacity = Math.max(0, Math.min(1, opacity));
  currentOpacity = opacity;
  if (mainWindow) {
    mainWindow.setOpacity(opacity);
  }
}

// 重置透明度到安全值
function resetOpacityToSafe() {
  const safeOpacity = 0.5; // 50%
  setOpacity(safeOpacity);
  
  // 通知渲染进程更新UI
  if (mainWindow) {
    mainWindow.webContents.send('opacity-reset', safeOpacity);
  }
}

// 注册全局快捷键
function registerGlobalShortcuts() {
  try {
    // 注册透明度重置快捷键: Cmd+Option+0
    const ret = globalShortcut.register('CommandOrControl+Alt+0', () => {
      console.log('Opacity reset shortcut triggered');
      resetOpacityToSafe();
    });
    
    if (!ret) {
      console.log('Registration failed for opacity reset shortcut');
    } else {
      console.log('Opacity reset shortcut registered successfully');
    }
  } catch (error) {
    console.error('Failed to register global shortcuts:', error);
  }
}

ipcMain.on('set-opacity', (event, opacity) => {
  setOpacity(opacity);
});

ipcMain.on('get-opacity', (event) => {
  event.reply('current-opacity', currentOpacity);
});

// 密码验证
ipcMain.handle('verify-password', async (event, password) => {
  return password === settings.password;
});

// 设置新密码
ipcMain.on('set-password', (event, password) => {
  settings.password = password;
  saveSettings();
});

// 加载收藏夹
ipcMain.handle('load-bookmarks', async () => {
  try {
    if (fs.existsSync(bookmarksFile)) {
      const data = fs.readFileSync(bookmarksFile, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
});

// 保存收藏夹
ipcMain.on('save-bookmarks', (event, bookmarks) => {
  try {
    fs.writeFileSync(bookmarksFile, JSON.stringify(bookmarks, null, 2));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
  }
});

// 加载设置
function loadSettings() {
  try {
    if (fs.existsSync(settingsFile)) {
      const data = fs.readFileSync(settingsFile, 'utf8');
      settings = { ...settings, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// 保存设置
function saveSettings() {
  try {
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// 配置网络设置
function configureNetworkSettings() {
  try {
    // 设置默认session的网络配置
    const defaultSession = session.defaultSession;
    
    // 忽略证书错误
    defaultSession.setCertificateVerifyProc((request, callback) => {
      // 总是允许证书
      callback(0);
    });
    
    // 设置用户代理
    defaultSession.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // 配置网络请求拦截
    defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      callback({ requestHeaders: details.requestHeaders });
    });
    
    // 设置网络超时和重试
    defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
      // 允许所有权限请求
      callback(true);
    });
    
    console.log('Network settings configured successfully');
  } catch (error) {
    console.error('Failed to configure network settings:', error);
  }
}



app.on('web-contents-created', (event, contents) => {
  // 只对主窗口的内容进行外部链接处理，不影响webview
  if (contents.getType() === 'window') {
    contents.setWindowOpenHandler(({ url }) => {
      require('electron').shell.openExternal(url);
      return { action: 'deny' };
    });
  } else if (contents.getType() === 'webview') {
    // 对webview内容，允许在当前webview中导航
    contents.setWindowOpenHandler(({ url }) => {
      // 检查是否是同域名或合理的跳转
      if (url.startsWith('http://') || url.startsWith('https://')) {
        // 在webview中打开
        contents.loadURL(url);
      }
      return { action: 'deny' };
    });
  }
});

app.whenReady().then(async () => {
  loadSettings(); // 加载设置
  
  // 配置网络设置
  configureNetworkSettings();
  
  // 注册全局快捷键
  registerGlobalShortcuts();
  
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// 应用退出前清理
app.on('before-quit', () => {
  // 取消注册所有全局快捷键
  globalShortcut.unregisterAll();
}); 