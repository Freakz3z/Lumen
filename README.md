<div align="center">
  <img src="./src/assets/img/icon/avatar.jpg" width="120" height="120" style="border-radius: 50%; box-shadow: 0 0 15px rgba(0,0,0,0.2);" alt="Logo">
  <h1>Lumen</h1>
  <p>
    一个基于 <b>Vue 3</b> + <b>Vite</b> 重构的现代化、高颜值个人主页
  </p>
  
  <p align="center">
    <a href="./README_EN.md">English</a> | <span>简体中文</span>
  </p>

  <p>
    <a href="https://vuejs.org/">
      <img src="https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vue.js" alt="Vue 3">
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-5.x-646cff?style=flat-square&logo=vite" alt="Vite">
    </a>
    <a href="https://getbootstrap.com/">
      <img src="https://img.shields.io/badge/Bootstrap-5.x-purple?style=flat-square&logo=bootstrap" alt="Bootstrap 5">
    </a>
    <a href="https://github.com/Freakz3z/Personal-Page/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
    </a>
  </p>
</div>

---

<div align="center">
    <img src="./src/assets/img/page-preview.png" alt="Homepage Preview" width="100%" style="border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.15);">
</div>

## 📖 简介 | Introduction

这是一个简洁、美观且功能丰富的个人主页项目。原项目基于 HTML/jQuery 开发，现已完全使用 **Vue 3 Composition API** + **Vite** 进行重构。
它集成了音乐播放器、留言板、实时天气、时光胶囊、动态粒子背景等功能，并针对移动端进行了深度适配，提供如原生应用般的丝滑体验。

## ✨ 功能特性 | Features

### 🎨 核心亮点
- **⚡️ 现代技术栈** - 采用 Vue 3 + Vite 构建，秒级启动，热更新飞快。
- **📱 全端适配** - 完美响应式设计，PC 端宽屏展示，移动端沉浸式体验。
- **💎 玻璃拟态设计** - 全局采用 **iziToast** 深度定制的消息通知系统，配合半透明模糊效果，带来精致的视觉体验。
- **⌨️ 身份打字机** - 集成 `Typed.js`，支持在 Logo 下方循环动态展示你的多重身份（可配置）。

### 🛠 实用功能
- **🎵 沉浸式音乐** - 左侧独立歌词面板 + 下方控制条，支持拖拽进度、歌词高亮、网易云/QQ音乐歌单解析。
- **🌦 实时天气** - 自动获取当前位置天气信息（支持 IP 定位），并提供"正在更新"的即时反馈交互。
- **⏳ 时光胶囊** - 实时显示今日、本周、本月、本年的时间进度，提醒用户珍惜时间。
- **💬 留言互动** - 内置 **Giscus** 评论系统，基于 GitHub Discussions，无需后端，数据安全。
- **👤 关于我** - 支持 GitHub README 自动获取与 Markdown 渲染，一站式展示你的项目与技术栈。
- **🔗 社交聚合** - 首页智能解析并展示 GitHub、QQ、Email、Bilibili、Telegram 等社交链接。

### ⚙️ 系统配置
- **🌸 动态背景** - 升级版 Canvas 樱花飘落特效，更加自然的物理模拟。
- **🖼 壁纸切换** - 支持 本地/每日一图 两种模式，并自动保存用户偏好。
- **🔧 极简配置** - 所有个性化信息均收敛于 `setting.json`，修改后无需重新构建即可生效（开发模式下）。

## 🚀 快速开始 | Quick Start

### 环境要求
- Node.js > 16.0
- npm / yarn / pnpm

### 1. 克隆项目
```bash
git clone https://github.com/Freakz3z/Lumen.git
cd Lumen
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
npm run dev
```

### 4. 构建部署
```bash
npm run build
```
构建产物位于 `dist` 目录，可直接部署到 Vercel, Netlify, Github Pages 或任何静态服务器。

## 📂 项目结构 | Project Structure

```
Lumen/
├── src/
│   ├── assets/             # 静态资源 (css, img, fonts)
│   ├── components/         # UI 组件
│   │   ├── Background.vue  # 樱花背景
│   │   ├── MusicPlayer.vue # 音乐播放器逻辑
│   │   ├── MessageBoard.vue# 留言板组件
│   │   └── AboutMe.vue     # 关于我组件（GitHub README 展示）
│   ├── composables/        # 组合式函数 (Hooks)
│   │   ├── useTime.js      # 时间与胶囊逻辑
│   │   └── useWeather.js   # 天气获取逻辑
│   ├── App.vue             # 核心入口 (布局、动画、全局状态)
│   └── main.js             # Vue 初始化
├── setting.json            # 全局配置文件
└── README.md
```

## ⚙️ 配置指南 | Configuration

项目的所有个性化配置均位于根目录下的 `setting.json` 文件中。无需修改代码，直接编辑 JSON 即可。

### 完整配置项说明

#### 1. 基础信息
```json
{
    "title": "Lumen",                    // 网站标题
    "description": "A minimalist...",    // Meta 描述信息（SEO）
    "keywords": "Lumen,Personal Page",   // Meta 关键词
    "author": "Freakk",                  // 作者名称（显示在页脚）
    "Copyright_text": "Freakk"           // 版权信息
}
```

#### 2. Logo 与身份展示
```json
{
    "logo_img": "./assets/img/icon/avatar.jpg",  // 头像路径
    "logo_text_1": "Freakk",                      // Logo 主标题
    "logo_text_2": "",                            // Logo 副标题

    // 身份打字机配置（可添加 1-3 个，循环展示）
    "who_am_i_1": "每天都早八晚十的可怜大三学牲",
    "who_am_i_2": "退化到只会Accpet的Vibe Coder",
    "who_am_i_3": "模型曲线一路滑坡的AI Engineer"
}
```

#### 3. 社交媒体链接
```json
{
    "github": "Freakz3z",              // GitHub 用户名
    "qq": "3020517046",                // QQ 号码
    "email": "3020517046@qq.com",      // 邮箱地址
    "bilibili": "",                    // Bilibili UID（可选）
    "telegram": ""                     // Telegram 用户名（可选）
}
```

#### 4. 自定义网站链接（6个快捷入口）
```json
{
    // 格式：["跳转链接", "FontAwesome图标类名", "显示名称"]
    "link_1": ["https://freakk.love/", "fa-solid fa-blog", "我的博客"],
    "link_2": ["https://github-wrapped4u.vercel.app/", "fa-solid fa-cloud", "GitHub统计"],
    "link_3": ["https://vusic.xxx.com/", "fa-solid fa-music", "音乐可视化"],
    "link_4": ["https://muse.xxx.com/", "fa-solid fa-book-bookmark", "英语助手"],
    "link_5": ["https://lifecalendar.xxx.com/", "fa-solid fa-calendar-days", "人生日历"],
    "link_6": ["", "fa-solid fa-flask", "开发中..."]  // 留空则不跳转
}
```

#### 5. 音乐播放器配置
```json
{
    "music_server": "netease",         // 音乐平台：netease(网易云), tencent(QQ), kugou, xiami, baidu
    "music_type": "playlist",          // 类型：playlist(歌单), song(单曲), album(专辑), artist(歌手)
    "music_id": "3778678",             // 对应的 ID（如网易云歌单 ID）
    "music_api": "https://api.injahow.cn/meting/"  // Meting API 地址（一般无需修改）
}
```

**获取歌单 ID 方法：**
1. 打开网易云音乐网页版
2. 找到你的歌单，URL 中类似 `?id=3778678` 的数字就是歌单 ID

#### 6. 留言板配置（Giscus）
```json
{
    "giscus": {
        "repo": "Freakz3z/Freakk-Personal-Page",  // GitHub 仓库（格式：用户名/仓库名）
        "repoId": "R_kgDOQ_scEA",                 // 仓库 ID
        "category": "General",                     // 讨论区分类
        "categoryId": "DIC_kwDOQ_scEM4C1VBD"      // 分类 ID
    }
}
```

**获取配置方法：**
1. 访问 [Giscus 配置页面](https://giscus.app/)
2. 输入你的仓库信息
3. 复制生成的配置到 `setting.json`

#### 7. GitHub README 展示（新增）
```json
{
    "github_readme": {
        "enabled": true,    // 是否启用（true/false）
        "url": "https://raw.githubusercontent.com/Freakz3z/Freakz3z/main/README.md"
    }
}
```

**URL 格式说明：**
- 必须使用 `raw.githubusercontent.com` 地址
- 格式：`https://raw.githubusercontent.com/用户名/仓库名/分支名/README.md`
- 支持 Markdown 所有语法，会自动解析并渲染

#### 8. 其他系统配置
```json
{
    "background_animation": true,  // 是否启用背景动画（樱花飘落）
    "beian": ""                    // 备案号（可选，显示在页脚）
}
```

### 配置提示
- 修改配置后，在开发模式下刷新页面即可生效
- 部署时记得先执行 `npm run build` 构建
- 所有图标使用 [FontAwesome 6](https://fontawesome.com/search?o=r&m=free) 免费版
- 音乐封面和歌词会自动从 Meting API 获取

## ☁️ 部署建议 | Deployment

推荐使用 **Vercel** 进行零成本部署：
1. Fork 本仓库。
2. 在 Vercel 导入该仓库。
3. 框架预设选择 `Vite`。
4. 点击 Deploy 即可。

## 📄 许可证 | License

MIT License © 2026 Freakk
