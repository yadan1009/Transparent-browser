# 透明浏览器 / Transparent Browser

[English](#english) | [中文](#中文)

---

## 中文

一个功能强大的透明浏览器应用，基于 Electron 构建，支持窗口透明度调节和多种实用功能。

### ✨ 功能特点

- 🌟 **透明度调节** - 支持 0-100% 窗口透明度调节，快捷键一键重置
- 🌐 **完整浏览功能** - 前进、后退、刷新、地址栏导航
- 📚 **密码保护收藏夹** - 安全的书签管理系统（默认密码：123456）
- 🎬 **视频倍速控制** - 支持 0.25x - 32x 倍速播放，实时调节
- 🔗 **自定义快捷链接** - 个性化主页，支持添加/编辑/删除快捷链接
- 🎨 **现代玻璃质感** - 精美的毛玻璃效果界面设计
- ⚡ **高性能渲染** - 基于 Chromium 内核，稳定流畅


### 📋 系统要求

- **操作系统**: macOS 10.14 或更高版本
- **Node.js**: 16.0 或更高版本
- **内存**: 至少 4GB RAM
- **存储**: 至少 200MB 可用空间

### 🚀 安装和运行

#### 开发环境运行

1. **克隆仓库**
```bash
git clone https://github.com/yadan1009/Transparent-browser.git
cd Transparent-browser
```

2. **安装依赖**
```bash
npm install
```

3. **启动应用**
```bash
npm start
```

#### 构建发布版本

构建 macOS 应用包：
```bash
npm run dist
```

构建完成后，在 `dist` 目录中找到 `.dmg` 安装文件。

### 🎯 使用指南

#### 基本操作
1. **浏览网页** - 在地址栏输入 URL 或搜索关键词
2. **调节透明度** - 点击工具栏透明度按钮，使用滑块调节
3. **管理收藏夹** - 点击收藏夹按钮，输入密码（默认：123456）
4. **视频倍速** - 在视频页面点击倍速按钮，调节播放速度

#### 自定义快捷链接
1. 在主页点击"管理自定义链接"按钮
2. 添加新链接：输入名称和URL
3. 编辑链接：点击链接旁的编辑按钮
4. 删除链接：点击删除按钮确认

#### 快捷键
- **重置透明度**: `Cmd+0`
- **刷新页面**: `Cmd+R`
- **前进/后退**: `Cmd+←/→`

### 🛠️ 技术栈

- **框架**: Electron
- **前端**: HTML5, CSS3, JavaScript
- **UI设计**: 毛玻璃效果 (backdrop-filter)
- **数据存储**: localStorage + Electron userData
- **构建工具**: electron-builder

### 📁 项目结构

```
Transparent-browser/
├── main.js          # 主进程
├── renderer.js      # 渲染进程
├── preload.js       # 预加载脚本
├── index.html       # 主界面
├── styles.css       # 样式文件
├── package.json     # 项目配置
└── README.md        # 项目文档
```

### 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request


### 👨‍💻 开发者

**作者**: zwan0569@student.monash.edu

---

## English

A powerful transparent browser application built with Electron, featuring window transparency control and various practical functions.

### ✨ Features

- 🌟 **Transparency Control** - Support 0-100% window transparency adjustment with hotkey reset
- 🌐 **Full Browser Functionality** - Forward, back, refresh, address bar navigation
- 📚 **Password-Protected Bookmarks** - Secure bookmark management system (default password: 123456)
- 🎬 **Video Speed Control** - Support 0.25x - 32x playback speed with real-time adjustment
- 🔗 **Custom Quick Links** - Personalized homepage with add/edit/delete quick links
- 🎨 **Modern Glass Effect** - Beautiful frosted glass UI design
- ⚡ **High Performance** - Based on Chromium engine, stable and smooth


### 📋 System Requirements

- **OS**: macOS 10.14 or higher
- **Node.js**: 16.0 or higher
- **Memory**: At least 4GB RAM
- **Storage**: At least 200MB available space

### 🚀 Installation & Usage

#### Development Environment

1. **Clone Repository**
```bash
git clone https://github.com/yadan1009/Transparent-browser.git
cd Transparent-browser
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Application**
```bash
npm start
```

#### Build Release Version

Build macOS app bundle:
```bash
npm run dist
```

After building, find the `.dmg` installer in the `dist` directory.

### 🎯 User Guide

#### Basic Operations
1. **Browse Web** - Enter URL or search keywords in address bar
2. **Adjust Transparency** - Click transparency button in toolbar, use slider to adjust
3. **Manage Bookmarks** - Click bookmarks button, enter password (default: 123456)
4. **Video Speed** - Click speed button on video pages, adjust playback speed

#### Custom Quick Links
1. Click "Manage Custom Links" button on homepage
2. Add new link: Enter name and URL
3. Edit link: Click edit button next to link
4. Delete link: Click delete button and confirm

#### Keyboard Shortcuts
- **Reset Transparency**: `Cmd+0`
- **Refresh Page**: `Cmd+R`
- **Forward/Back**: `Cmd+←/→`

### 🛠️ Tech Stack

- **Framework**: Electron
- **Frontend**: HTML5, CSS3, JavaScript
- **UI Design**: Glass effect (backdrop-filter)
- **Data Storage**: localStorage + Electron userData
- **Build Tool**: electron-builder

### 📁 Project Structure

```
Transparent-browser/
├── main.js          # Main process
├── renderer.js      # Renderer process
├── preload.js       # Preload script
├── index.html       # Main interface
├── styles.css       # Style file
├── package.json     # Project configuration
└── README.md        # Project documentation
```

### 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


### 👨‍💻 Developer

**Author**: zwan0569@student.monash.edu 
