// 获取 DOM 元素
let webview;
const urlBar = document.getElementById('url-bar');
const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');
const reloadBtn = document.getElementById('reload-btn');
const homeBtn = document.getElementById('home-btn');
const goBtn = document.getElementById('go-btn');
const opacityBtn = document.getElementById('opacity-btn');
const bookmarkBtn = document.getElementById('bookmark-btn');
const opacityPanel = document.getElementById('opacity-panel');
const passwordPanel = document.getElementById('password-panel');
const bookmarkPanel = document.getElementById('bookmark-panel');
const opacitySlider = document.getElementById('opacity-slider');
const opacityValue = document.getElementById('opacity-value');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');
const addBookmarkBtn = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmark-list');
const changePasswordBtn = document.getElementById('change-password-btn');
const changePasswordPanel = document.getElementById('change-password-panel');
const currentPasswordInput = document.getElementById('current-password');
const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const savePasswordBtn = document.getElementById('save-password');
const changePasswordError = document.getElementById('change-password-error');
// 视频倍速相关元素
const videoSpeedBtn = document.getElementById('video-speed-btn');
const videoSpeedPanel = document.getElementById('video-speed-panel');
const customLinksBtn = document.getElementById('custom-links-btn');
const customLinksPanel = document.getElementById('custom-links-panel');
const addNewLinkBtn = document.getElementById('add-new-link');
const customLinksList = document.getElementById('custom-links-list');

// 默认快捷链接
let customLinks = [
    { name: "🔍 Google 搜索", url: "https://www.google.com", icon: "🔍" },
    { name: "🔍 百度搜索", url: "https://www.baidu.com", icon: "🔍" },
    { name: "📺 哔哩哔哩", url: "https://www.bilibili.com", icon: "📺" },
    { name: "🎬 YouTube", url: "https://www.youtube.com", icon: "🎬" },
    { name: "💻 GitHub", url: "https://github.com", icon: "💻" },
    { name: "💭 知乎", url: "https://www.zhihu.com", icon: "💭" },
    { name: "🛒 淘宝", url: "https://www.taobao.com", icon: "🛒" },
    { name: "📰 微博", url: "https://weibo.com", icon: "📰" }
];

// 加载自定义链接
function loadCustomLinks() {
    try {
        const saved = localStorage.getItem('customLinks');
        if (saved) {
            customLinks = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Failed to load custom links:', error);
    }
}

// 保存自定义链接
function saveCustomLinks() {
    try {
        localStorage.setItem('customLinks', JSON.stringify(customLinks));
    } catch (error) {
        console.error('Failed to save custom links:', error);
    }
}

// 加载启动页面
function loadStartPage() {
    loadCustomLinks(); // 加载自定义链接
    
    const startPageHTML = `
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>透明浏览器 - 首页</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                color: white;
                min-height: 100vh;
                overflow-x: hidden;
                position: relative;
            }
            
            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: 
                    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
                pointer-events: none;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 40px 20px;
                position: relative;
                z-index: 1;
            }
            
            .header {
                text-align: center;
                margin-bottom: 60px;
                padding: 40px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
                backdrop-filter: blur(30px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 24px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
                           0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            }
            
            .logo {
                font-size: 3.5em;
                margin-bottom: 16px;
                background: linear-gradient(135deg, #ffffff, #e0e0ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 700;
                letter-spacing: -2px;
                text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .subtitle {
                font-size: 1.3em;
                margin-bottom: 20px;
                opacity: 0.95;
                font-weight: 400;
                letter-spacing: 0.5px;
            }
            
            .version {
                font-size: 0.9em;
                opacity: 0.7;
                font-weight: 300;
            }
            
            .section {
                margin-bottom: 50px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
                backdrop-filter: blur(20px) saturate(150%);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1),
                           0 0 0 1px rgba(255, 255, 255, 0.05) inset;
            }
            
            .section-title {
                font-size: 1.8em;
                margin-bottom: 24px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .quick-links {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .quick-link {
                padding: 20px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
                border: 1px solid rgba(255, 255, 255, 0.25);
                border-radius: 16px;
                text-decoration: none;
                color: white;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
                overflow: hidden;
                font-weight: 500;
            }
            
            .quick-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.6s;
            }
            
            .quick-link:hover {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%);
                transform: translateY(-4px) scale(1.02);
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2),
                           0 0 0 1px rgba(255, 255, 255, 0.3) inset;
            }
            
            .quick-link:hover::before {
                left: 100%;
            }
            
            .link-icon {
                font-size: 1.4em;
                flex-shrink: 0;
            }
            
            .link-name {
                flex: 1;
                font-size: 1em;
            }
            
            
            
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 24px;
                margin-bottom: 32px;
            }
            
            .feature {
                padding: 24px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                transition: all 0.3s ease;
            }
            
            .feature:hover {
                transform: translateY(-2px);
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            }
            
            .feature-icon {
                font-size: 2.2em;
                margin-bottom: 16px;
                display: block;
            }
            
            .feature-title {
                font-size: 1.2em;
                font-weight: 600;
                margin-bottom: 8px;
            }
            
            .feature-desc {
                font-size: 0.95em;
                opacity: 0.85;
                line-height: 1.5;
            }
            
            .usage-guide {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            
            .usage-item {
                padding: 20px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
                border-left: 4px solid rgba(0, 122, 255, 0.6);
                border-radius: 12px;
            }
            
            .usage-title {
                font-size: 1.1em;
                font-weight: 600;
                margin-bottom: 8px;
                color: #87ceeb;
            }
            
            .usage-desc {
                font-size: 0.9em;
                opacity: 0.8;
                line-height: 1.4;
            }
            
            .footer {
                text-align: center;
                padding: 40px;
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .signature {
                font-size: 1em;
                opacity: 0.7;
                font-weight: 300;
                letter-spacing: 1px;
            }
            
            .signature a {
                color: #87ceeb;
                text-decoration: none;
                transition: all 0.3s ease;
            }
            
            .signature a:hover {
                color: white;
                text-shadow: 0 0 8px rgba(135, 206, 235, 0.6);
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-6px); }
            }
            
            .logo {
                animation: float 6s ease-in-out infinite;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🌟 透明浏览器</div>
                <p class="subtitle">享受独特的玻璃质感浏览体验</p>
                <p class="version">Transparent Browser v1.0</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">🚀 快速访问</h2>
                <div class="quick-links">
                    ${customLinks.map(link => `
                        <a href="${link.url}" class="quick-link">
                            <span class="link-icon">${link.icon}</span>
                            <span class="link-name">${link.name.replace(link.icon + ' ', '')}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">✨ 功能特色</h2>
                <div class="features">
                    <div class="feature">
                        <span class="feature-icon">🎨</span>
                        <div class="feature-title">透明度调节</div>
                        <div class="feature-desc">
                            动态调节窗口透明度，支持0-100%任意调节，打造独特的视觉体验。
                            快捷键 ⌘+⌥+0 可快速重置透明度。
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🔖</span>
                        <div class="feature-title">安全收藏夹</div>
                        <div class="feature-desc">
                            密码保护的收藏夹功能，安全存储您的重要网站。
                            支持添加、删除收藏，并可修改访问密码。
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">⚡</span>
                        <div class="feature-title">视频倍速控制</div>
                        <div class="feature-desc">
                            实时调节网页视频播放速度，支持0.25x-32x倍速，
                            拖动滑块即可实时应用，观看体验更灵活。
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🌐</span>
                        <div class="feature-title">现代浏览体验</div>
                        <div class="feature-desc">
                            基于Chromium内核，支持最新Web标准，
                            流畅的页面渲染和JavaScript执行性能。
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🎯</span>
                        <div class="feature-title">自定义快捷方式</div>
                        <div class="feature-desc">
                            可自定义首页快捷链接，添加您常用的网站，
                            打造个性化的浏览器首页体验。
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🛡️</span>
                        <div class="feature-title">隐私保护</div>
                        <div class="feature-desc">
                            本地化数据存储，不上传任何个人信息，
                            保护您的隐私安全和浏览记录。
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">📖 使用指南</h2>
                <div class="usage-guide">
                    <div class="usage-item">
                        <div class="usage-title">透明度调节</div>
                        <div class="usage-desc">
                            点击右上角透明度图标，拖动滑块调节窗口透明度。
                            也可点击预设按钮快速设置。紧急情况下使用 ⌘+⌥+0 重置。
                        </div>
                    </div>
                    <div class="usage-item">
                        <div class="usage-title">收藏夹管理</div>
                        <div class="usage-desc">
                            点击收藏夹图标，输入密码（默认：123456）进入收藏夹。
                            可添加当前页面到收藏，或修改访问密码。
                        </div>
                    </div>
                    <div class="usage-item">
                        <div class="usage-title">视频倍速</div>
                        <div class="usage-desc">
                            在有视频的页面，点击倍速图标，拖动滑块实时调节播放速度。
                            支持0.25x到32x的极端倍速调节。
                        </div>
                    </div>
                    <div class="usage-item">
                        <div class="usage-title">自定义首页</div>
                        <div class="usage-desc">
                            点击"自定义链接"按钮，可以添加、编辑或删除快捷链接，
                            打造专属于您的个性化首页。
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <div class="signature">
                    Designed & Developed by <a href="mailto:zwan0569@student.monash.edu">zwan0569@student.monash.edu</a>
                    <br>
                    <span style="font-size: 0.8em; opacity: 0.6;">Monash University • 2025</span>
                </div>
            </div>
        </div>
        
        <script>
            // 页面加载动画
            document.addEventListener('DOMContentLoaded', function() {
                const elements = document.querySelectorAll('.feature, .usage-item, .quick-link');
                elements.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            });
        </script>
    </body>
    </html>`;
    
    if (webview) {
        webview.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(startPageHTML));
    }
}

// 初始化webview元素
document.addEventListener('DOMContentLoaded', () => {
    webview = document.getElementById('webview');
    if (webview) {
        setupWebviewEvents();
    }
});

// 不再使用硬编码的密码
let bookmarks = [];
let currentOpacityValue = 1.0; // 保存当前透明度值

// 设置webview事件监听
function setupWebviewEvents() {
    if (!webview) return;
    
    // 立即加载启动页面
    setTimeout(() => {
        loadStartPage();
        // 清空地址栏，因为主页不需要显示URL
        if (urlBar) {
            urlBar.value = '';
        }
    }, 100);

// 等待 webview 加载完成
webview.addEventListener('dom-ready', () => {
    // 更新导航按钮状态
    updateNavigationButtons();
    
    // 注入自定义 CSS 以改善显示效果
    webview.insertCSS(`
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    `);
});

// 监听页面导航
webview.addEventListener('did-navigate', (e) => {
    if (urlBar && e.url) {
        // 如果是homepage的data URL，显示友好的地址
        if (e.url.startsWith('data:text/html')) {
            urlBar.value = ''; // 主页时地址栏为空
        } else {
    urlBar.value = e.url;
        }
    }
    updateNavigationButtons();
});

webview.addEventListener('did-navigate-in-page', (e) => {
    if (urlBar && e.url) {
        // 如果是homepage的data URL，显示友好的地址
        if (e.url.startsWith('data:text/html')) {
            urlBar.value = ''; // 主页时地址栏为空
        } else {
    urlBar.value = e.url;
        }
    }
    updateNavigationButtons();
});

    // 监听页面开始加载
    webview.addEventListener('did-start-loading', () => {
        updateNavigationButtons();
    });

    // 监听页面加载完成
    webview.addEventListener('did-finish-load', () => {
        updateNavigationButtons();
        // 确保地址栏显示正确的URL
        if (urlBar && webview) {
            const currentUrl = webview.getURL();
            if (currentUrl && currentUrl !== 'about:blank') {
                // 如果是homepage的data URL，显示友好的地址
                if (currentUrl.startsWith('data:text/html')) {
                    urlBar.value = ''; // 主页时地址栏为空
                } else {
                    urlBar.value = currentUrl;
                }
            }
        }
});

// 监听页面标题变化
webview.addEventListener('page-title-updated', (e) => {
    document.title = e.title + ' - 透明浏览器';
});
    
    // 处理新窗口请求
    webview.addEventListener('new-window', (e) => {
        e.preventDefault();
        // 检查URL是否有效
        if (e.url && (e.url.startsWith('http://') || e.url.startsWith('https://'))) {
            // 在当前webview中打开链接
            webview.loadURL(e.url);
            // 更新地址栏
            if (urlBar) {
                urlBar.value = e.url;
            }
        }
    });

    // 处理webview内的导航
    webview.addEventListener('will-navigate', (e) => {
        // 更新地址栏
        if (urlBar && e.url) {
            // 如果是homepage的data URL，显示友好的地址
            if (e.url.startsWith('data:text/html')) {
                urlBar.value = ''; // 主页时地址栏为空
            } else {
                urlBar.value = e.url;
            }
        }
    });

    // 处理控制台消息（用于调试）
    webview.addEventListener('console-message', (e) => {
        console.log('Webview console:', e.message);
    });

    // 处理加载错误
    webview.addEventListener('did-fail-load', (e) => {
        if (e.errorCode === -3) {
            // 忽略用户取消的加载
            return;
        }
        
        console.error('加载失败:', e.errorDescription);
        
        // 显示简单的错误页面
        const errorHTML = `<html><head><meta charset="UTF-8"><style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f5f5f7;color:#333;text-align:center}.error{padding:40px}h1{font-size:48px;margin:0 0 20px;color:#666}p{font-size:18px;margin:10px 0}</style></head><body><div class="error"><h1>😕</h1><p>无法加载页面</p><p>请检查网络连接或尝试其他网址</p></div></body></html>`;
        
        webview.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(errorHTML));
    });
}

// 导航按钮事件
backBtn.addEventListener('click', () => {
    if (webview && webview.canGoBack()) {
        webview.goBack();
    }
});

forwardBtn.addEventListener('click', () => {
    if (webview && webview.canGoForward()) {
        webview.goForward();
    }
});

reloadBtn.addEventListener('click', () => {
    if (webview) {
    webview.reload();
    }
});

homeBtn.addEventListener('click', () => {
    if (webview) {
        loadStartPage();
        // 清空地址栏，因为主页不需要显示URL
        if (urlBar) {
            urlBar.value = '';
        }
    }
});

// URL 输入处理
function navigateToURL() {
    let url = urlBar.value.trim();
    
    if (!url || !webview) return;
    
    // 检查是否是搜索查询
    if (!url.includes('.') || url.includes(' ')) {
        // 使用 Google 搜索
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // 添加协议
        url = 'https://' + url;
    }
    
    webview.loadURL(url);
}

goBtn.addEventListener('click', navigateToURL);

urlBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        navigateToURL();
    }
});

// 面板控制函数
function showPanel(panel) {
    // 关闭所有面板
    document.querySelectorAll('.popup-panel').forEach(p => p.classList.remove('show'));
    // 显示指定面板
    panel.classList.add('show');
}

function hideAllPanels() {
    document.querySelectorAll('.popup-panel').forEach(p => p.classList.remove('show'));
}

// 点击空白处关闭面板
document.addEventListener('click', (e) => {
    if (!e.target.closest('.popup-panel') && !e.target.closest('.feature-btn')) {
        hideAllPanels();
    }
});

// 透明度按钮点击事件
opacityBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (opacityPanel.classList.contains('show')) {
        opacityPanel.classList.remove('show');
    } else {
        showPanel(opacityPanel);
    }
});



// 收藏夹按钮点击事件
bookmarkBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bookmarkPanel.classList.contains('show')) {
        bookmarkPanel.classList.remove('show');
    } else {
        showPanel(passwordPanel);
        passwordInput.value = '';
        passwordError.textContent = '';
        passwordError.classList.remove('show');
    }
});

// 透明度控制
opacitySlider.addEventListener('input', (e) => {
    const opacityPercent = parseInt(e.target.value);
    const opacity = opacityPercent / 100;
    opacityValue.textContent = opacityPercent + '%';
    currentOpacityValue = opacity;
    
    // 直接设置透明度
    if (window.electronAPI) {
        window.electronAPI.setOpacity(opacity);
    }
});

// 预设透明度按钮
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const opacityPercent = parseInt(btn.dataset.opacity);
        const opacity = opacityPercent / 100;
        
        opacitySlider.value = opacityPercent;
        opacityValue.textContent = opacityPercent + '%';
        currentOpacityValue = opacity;
        
        if (window.electronAPI) {
            window.electronAPI.setOpacity(opacity);
        }
    });
});

// 密码验证
passwordSubmit.addEventListener('click', async () => {
    const password = passwordInput.value;
    
    if (window.electronAPI && window.electronAPI.verifyPassword) {
        const isValid = await window.electronAPI.verifyPassword(password);
        if (isValid) {
            showPanel(bookmarkPanel);
            loadBookmarks();
        } else {
            passwordError.textContent = '密码错误，请重试';
            passwordError.classList.add('show');
            passwordInput.value = '';
            
            // 3秒后隐藏错误消息
            setTimeout(() => {
                passwordError.classList.remove('show');
            }, 3000);
        }
    } else {
        // 如果 electronAPI 不可用，使用本地存储
        const savedPassword = localStorage.getItem('bookmarkPassword') || '123456';
        if (password === savedPassword) {
            showPanel(bookmarkPanel);
            loadBookmarks();
        } else {
            passwordError.textContent = '密码错误，请重试';
            passwordError.classList.add('show');
            passwordInput.value = '';
            
            setTimeout(() => {
                passwordError.classList.remove('show');
            }, 3000);
        }
    }
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        passwordSubmit.click();
    }
});

// 修改密码功能
changePasswordBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPanel(changePasswordPanel);
    // 清空输入框
    currentPasswordInput.value = '';
    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
    changePasswordError.textContent = '';
    changePasswordError.classList.remove('show');
});

savePasswordBtn.addEventListener('click', async () => {
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // 验证输入
    if (!currentPassword || !newPassword || !confirmPassword) {
        changePasswordError.textContent = '请填写所有字段';
        changePasswordError.classList.add('show');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        changePasswordError.textContent = '新密码与确认密码不一致';
        changePasswordError.classList.add('show');
        return;
    }
    
    if (newPassword.length < 4) {
        changePasswordError.textContent = '新密码至少需要4个字符';
        changePasswordError.classList.add('show');
        return;
    }
    
    // 验证当前密码
    if (window.electronAPI && window.electronAPI.verifyPassword) {
        const isValid = await window.electronAPI.verifyPassword(currentPassword);
        if (isValid) {
            // 保存新密码
            window.electronAPI.setPassword(newPassword);
            changePasswordError.textContent = '密码修改成功！';
            changePasswordError.style.color = '#34C759';
            changePasswordError.classList.add('show');
            
            // 2秒后关闭面板
            setTimeout(() => {
                showPanel(bookmarkPanel);
                changePasswordError.style.color = '';
            }, 2000);
        } else {
            changePasswordError.textContent = '当前密码错误';
            changePasswordError.classList.add('show');
        }
    } else {
        // 本地存储方式
        const savedPassword = localStorage.getItem('bookmarkPassword') || '123456';
        if (currentPassword === savedPassword) {
            localStorage.setItem('bookmarkPassword', newPassword);
            changePasswordError.textContent = '密码修改成功！';
            changePasswordError.style.color = '#34C759';
            changePasswordError.classList.add('show');
            
            setTimeout(() => {
                showPanel(bookmarkPanel);
                changePasswordError.style.color = '';
            }, 2000);
        } else {
            changePasswordError.textContent = '当前密码错误';
            changePasswordError.classList.add('show');
        }
    }
});

// 收藏夹功能
async function loadBookmarks() {
    if (window.electronAPI && window.electronAPI.loadBookmarks) {
        // 使用 Electron IPC 加载
        bookmarks = await window.electronAPI.loadBookmarks() || [];
    } else {
        // 从本地存储加载
        const saved = localStorage.getItem('bookmarks');
        if (saved) {
            bookmarks = JSON.parse(saved);
        }
    }
    renderBookmarks();
}

function saveBookmarks() {
    if (window.electronAPI && window.electronAPI.saveBookmarks) {
        // 使用 Electron IPC 保存
        window.electronAPI.saveBookmarks(bookmarks);
    } else {
        // 本地存储
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

function renderBookmarks() {
    bookmarkList.innerHTML = '';
    
    if (bookmarks.length === 0) {
        bookmarkList.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">暂无收藏</div>';
        return;
    }
    
    bookmarks.forEach((bookmark, index) => {
        const item = document.createElement('div');
        item.className = 'bookmark-item';
        item.innerHTML = `
            <img class="bookmark-icon" src="https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}" alt="">
            <div class="bookmark-info">
                <div class="bookmark-title">${bookmark.title}</div>
                <div class="bookmark-url">${bookmark.url}</div>
            </div>
            <button class="bookmark-delete" data-index="${index}">×</button>
        `;
        
        // 点击打开网页
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('bookmark-delete') && webview) {
                webview.loadURL(bookmark.url);
                hideAllPanels();
            }
        });
        
        // 删除按钮
        item.querySelector('.bookmark-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            bookmarks.splice(index, 1);
            saveBookmarks();
            renderBookmarks();
        });
        
        bookmarkList.appendChild(item);
    });
}

// 添加当前页面到收藏夹
addBookmarkBtn.addEventListener('click', () => {
    if (!webview) {
        alert('浏览器未准备好');
        return;
    }
    
    const currentUrl = webview.getURL();
    const currentTitle = webview.getTitle();
    
    // 检查是否已存在
    if (bookmarks.some(b => b.url === currentUrl)) {
        alert('该页面已经在收藏夹中');
        return;
    }
    
    bookmarks.unshift({
        title: currentTitle || '无标题',
        url: currentUrl,
        addedAt: new Date().toISOString()
    });
    
    saveBookmarks();
    renderBookmarks();
});

// 更新导航按钮状态
function updateNavigationButtons() {
    if (!webview) return;
    backBtn.disabled = !webview.canGoBack();
    forwardBtn.disabled = !webview.canGoForward();
}



// 初始化时获取当前透明度
if (window.electronAPI) {
    window.electronAPI.getOpacity();
}

// 自定义链接按钮功能
if (customLinksBtn) {
    customLinksBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (customLinksPanel.classList.contains('show')) {
            customLinksPanel.classList.remove('show');
    } else {
            showCustomLinksPanel();
        }
    });
}

// 视频倍速功能
if (videoSpeedBtn) {
    videoSpeedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (videoSpeedPanel.classList.contains('show')) {
            videoSpeedPanel.classList.remove('show');
        } else {
            showPanel(videoSpeedPanel);
        }
    });
}



// 视频倍速控制功能
const speedSlider = document.getElementById('speed-slider');
const speedSliderValue = document.getElementById('speed-slider-value');
const currentSpeedValue = document.getElementById('current-speed-value');
const resetSpeedBtn = document.getElementById('reset-speed-btn');

let currentVideoSpeed = 1.0;

// 滑块控制 - 实时应用倍速
if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
        const speed = parseFloat(e.target.value);
        setVideoSpeed(speed);
        updateSpeedUI(speed);
    });
}

// 重置倍速按钮
if (resetSpeedBtn) {
    resetSpeedBtn.addEventListener('click', () => {
        setVideoSpeed(1.0);
        updateSpeedUI(1.0);
    });
}

function setVideoSpeed(speed) {
    currentVideoSpeed = speed;
    
    if (webview) {
        // 在webview中执行JS代码来改变视频倍速
        webview.executeJavaScript(`
            (function() {
                const videos = document.querySelectorAll('video');
                videos.forEach(video => {
                    video.playbackRate = ${speed};
                });
                console.log('Set video speed to ${speed}x for ' + videos.length + ' videos');
            })();
        `);
    }
}

function updateSpeedUI(speed) {
    // 更新当前倍速显示
    if (currentSpeedValue) {
        currentSpeedValue.textContent = speed.toFixed(2) + '×';
    }
    
    // 更新滑块
    if (speedSlider) {
        speedSlider.value = speed;
    }
    
    // 更新滑块值显示
    if (speedSliderValue) {
        speedSliderValue.textContent = speed.toFixed(2) + '×';
    }
}

// 首次使用提示
function showFirstTimeGuide() {
    const modal = document.createElement('div');
    modal.className = 'first-time-guide-modal';
    modal.innerHTML = `
        <div class="first-time-guide-backdrop"></div>
        <div class="first-time-guide-dialog">
            <div class="first-time-guide-header">
                <h3>🎉 欢迎使用透明浏览器</h3>
            </div>
            <div class="first-time-guide-content">
                <p>您可以自由调节窗口透明度，享受独特的浏览体验！</p>
                <div class="shortcut-tip">
                    <div class="tip-icon">⌨️</div>
                    <div class="tip-text">
                        <strong>快捷键重置透明度</strong>
                        <p>如果透明度过高导致界面难以看清，请按：</p>
                        <div class="shortcut-keys">
                            <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>0</kbd>
                        </div>
                        <p class="shortcut-desc">快速重置透明度至 50%</p>
                    </div>
                </div>
                <div class="guide-features">
                    <div class="feature-item">
                        <span class="feature-icon">🎨</span>
                        <span>玻璃质感界面</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">🔖</span>
                        <span>密码保护收藏夹</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">⚡</span>
                        <span>快捷键重置</span>
                    </div>
                </div>
            </div>
            <div class="first-time-guide-actions">
                <button class="guide-got-it-btn">我知道了</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加动画
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 我知道了按钮
    modal.querySelector('.guide-got-it-btn').addEventListener('click', () => {
        removeModal(modal);
        localStorage.setItem('firstTimeGuideShown', 'true');
    });
    
    // 点击背景关闭
    modal.querySelector('.first-time-guide-backdrop').addEventListener('click', () => {
        removeModal(modal);
        localStorage.setItem('firstTimeGuideShown', 'true');
    });
}

function removeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// 透明度重置功能（备用方案）
function resetOpacityToSafe() {
    const safeOpacity = 50;
    opacitySlider.value = safeOpacity;
    opacityValue.textContent = safeOpacity + '%';
    currentOpacityValue = safeOpacity / 100;
    
    if (window.electronAPI) {
        window.electronAPI.setOpacity(safeOpacity / 100);
    }
    
    // 显示重置提示
    showResetNotification();
}

// 重置通知
function showResetNotification() {
    const notification = document.createElement('div');
    notification.className = 'reset-notification';
    notification.innerHTML = `
        <div class="reset-notification-content">
            <span class="reset-icon">✅</span>
            <span class="reset-text">透明度已重置至 50%</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// 监听主进程的透明度重置消息
if (window.electronAPI) {
    // 如果有 electronAPI，通过 preload 脚本监听
    window.electronAPI.onOpacityReset && window.electronAPI.onOpacityReset((opacity) => {
        currentOpacityValue = opacity;
        opacitySlider.value = opacity * 100;
        opacityValue.textContent = (opacity * 100) + '%';
        showResetNotification();
    });
} else {
    // 备用方案：本地快捷键监听
    document.addEventListener('keydown', (e) => {
        // ⌘ + ⌥ + 0 重置透明度
        if (e.metaKey && e.altKey && e.key === '0') {
            e.preventDefault();
            resetOpacityToSafe();
        }
    });
}

// 更新透明度监听
if (window.electronAPI) {
    window.electronAPI.onOpacityUpdate((event, opacity) => {
        currentOpacityValue = opacity;
        opacitySlider.value = opacity * 100;
        opacityValue.textContent = (opacity * 100) + '%';
    });
}

// 检查是否首次使用
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!localStorage.getItem('firstTimeGuideShown')) {
            showFirstTimeGuide();
        }
    }, 1000); // 延迟1秒显示，让用户先看到界面
}); 

// 自定义链接管理功能
let editingLinkIndex = -1;

// 显示自定义链接管理面板
function showCustomLinksPanel() {
    if (customLinksPanel) {
        showPanel(customLinksPanel);
        renderCustomLinksList();
    }
}

// 渲染自定义链接列表
function renderCustomLinksList() {
    if (!customLinksList) return;
    
    customLinksList.innerHTML = '';
    
    if (customLinks.length === 0) {
        customLinksList.innerHTML = '<div class="empty-state">暂无自定义链接<br><small>点击上方按钮添加您喜欢的网站</small></div>';
        return;
    }
    
    customLinks.forEach((link, index) => {
        const item = document.createElement('div');
        item.className = 'link-item';
        item.innerHTML = `
            <div class="link-icon-display">${link.icon}</div>
            <div class="link-info">
                <div class="link-name-display">${link.name.replace(link.icon + ' ', '')}</div>
                <div class="link-url-display">${link.url}</div>
            </div>
            <div class="link-actions">
                <button class="link-edit-btn" onclick="editCustomLink(${index})" title="编辑">✏️</button>
                <button class="link-delete-btn" onclick="deleteCustomLink(${index})" title="删除">🗑️</button>
            </div>
        `;
        customLinksList.appendChild(item);
    });
}

// 显示添加/编辑链接表单
function showLinkForm(index = -1) {
    const isEdit = index >= 0;
    const link = isEdit ? customLinks[index] : { name: '', url: '', icon: '🔗' };
    editingLinkIndex = index;
    
    const form = document.createElement('div');
    form.className = 'link-form';
    form.innerHTML = `
        <h4 style="margin: 0 0 16px 0; color: #333;">${isEdit ? '编辑' : '添加'}链接</h4>
        <div class="form-row">
            <div class="form-group" style="flex: 0 0 80px;">
                <label>图标</label>
                <input type="text" id="link-icon-input" value="${link.icon}" placeholder="🔗" maxlength="2">
            </div>
            <div class="form-group">
                <label>名称</label>
                <input type="text" id="link-name-input" value="${link.name.replace(link.icon + ' ', '')}" placeholder="链接名称">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>网址</label>
                <input type="url" id="link-url-input" value="${link.url}" placeholder="https://example.com">
            </div>
        </div>
        <div class="form-actions">
            <button class="save-link-btn" onclick="saveLinkForm()">保存</button>
            <button class="cancel-link-btn" onclick="cancelLinkForm()">取消</button>
        </div>
    `;
    
    // 在列表前插入表单
    customLinksList.parentNode.insertBefore(form, customLinksList);
    
    // 聚焦到名称输入框
    setTimeout(() => {
        const nameInput = document.getElementById('link-name-input');
        if (nameInput) nameInput.focus();
    }, 100);
}

// 保存链接表单
function saveLinkForm() {
    const icon = document.getElementById('link-icon-input').value.trim() || '🔗';
    const name = document.getElementById('link-name-input').value.trim();
    const url = document.getElementById('link-url-input').value.trim();
    
    if (!name || !url) {
        alert('请填写链接名称和网址');
        return;
    }
    
    // 验证URL格式
    try {
        new URL(url);
    } catch {
        alert('请输入有效的网址');
        return;
    }
    
    const linkData = {
        name: icon + ' ' + name,
        url: url,
        icon: icon
    };
    
    if (editingLinkIndex >= 0) {
        // 编辑现有链接
        customLinks[editingLinkIndex] = linkData;
    } else {
        // 添加新链接
        customLinks.push(linkData);
    }
    
    saveCustomLinks();
    cancelLinkForm();
    renderCustomLinksList();
    
    // 重新加载主页以显示更新
    setTimeout(() => {
        loadStartPage();
    }, 500);
}

// 取消链接表单
function cancelLinkForm() {
    const form = document.querySelector('.link-form');
    if (form) {
        form.remove();
    }
    editingLinkIndex = -1;
}

// 编辑自定义链接
function editCustomLink(index) {
    // 先取消现有表单
    cancelLinkForm();
    showLinkForm(index);
}

// 删除自定义链接
function deleteCustomLink(index) {
    if (confirm('确定要删除这个链接吗？')) {
        customLinks.splice(index, 1);
        saveCustomLinks();
        renderCustomLinksList();
        
        // 重新加载主页以显示更新
        setTimeout(() => {
            loadStartPage();
        }, 500);
    }
}

// 添加新链接按钮事件
if (addNewLinkBtn) {
    addNewLinkBtn.addEventListener('click', () => {
        // 先取消现有表单
        cancelLinkForm();
        showLinkForm();
    });
}

// 全局函数，供webview中的按钮调用
window.openCustomLinksPanel = showCustomLinksPanel; 