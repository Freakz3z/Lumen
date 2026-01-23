<div align="center">
  <img src="./src/assets/img/icon/avatar.jpg" width="120" height="120" style="border-radius: 50%; box-shadow: 0 0 15px rgba(0,0,0,0.2);" alt="Logo">
  <h1>Personal Page (Vue Refactor)</h1>
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
- **🌦 实时天气** - 自动获取当前位置天气信息（支持 IP 定位），并提供“正在更新”的即时反馈交互。
- **⏳ 时光胶囊** - 实时显示今日、本周、本月、本年的时间进度，提醒用户珍惜时间。
- **💬 留言互动** - 内置 **Giscus** 评论系统，基于 GitHub Discussions，无需后端，数据安全。
- **🔗 社交聚合** - 首页智能解析并展示 GitHub、QQ、Email、Bilibili 等社交链接。

### ⚙️ 系统配置
- **🌸 动态背景** - 升级版 Canvas 樱花飘落特效，更加自然的物理模拟。
- **🖼 壁纸切换** - 支持 本地/每日一图/随机动漫/随机风景 四种模式，并自动保存用户偏好。
- **🔧 极简配置** - 所有个性化信息均收敛于 `setting.json`，修改后无需重新构建即可生效（开发模式下）。

## 🚀 快速开始 | Quick Start

### 环境要求
- Node.js > 16.0
- npm / yarn / pnpm

### 1. 克隆项目
```bash
git clone https://github.com/Freakz3z/Personal-Page.git
cd Personal-Page
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
Personal-Page/
├── src/
│   ├── assets/             # 静态资源 (css, img, fonts)
│   ├── components/         # UI 组件
│   │   ├── Background.vue  # 樱花背景
│   │   ├── MusicPlayer.vue # 音乐播放器逻辑
│   │   └── MessageBoard.vue# 留言板组件
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

### 核心配置示例
```json
{
    "title": "Freakkの主页",
    "description": "Meta描述信息",
    "author": "Freakk",
    
    // 身份打字机配置 (支持多行)
    "who_am_i_1": "学生",
    "who_am_i_2": "开发者",
    "who_am_i_3": "梦想家",

    // 社交图标
    "github": "Freakz3z",
    "qq": "YourQQ",
    
    // 音乐播放器 (Meting API)
    "music_server": "netease",      // netease, tencent, kugou, xiami, baidu
    "music_type": "playlist",       // playlist, song, album, artist
    "music_id": "3778678",          // 网易云歌单ID
    
    // 自定义链接 [跳转地址, 图标Class, 显示名称]
    "link_1": ["https://blog.com", "fa-solid fa-blog", "我的博客"]
}
```

## ☁️ 部署建议 | Deployment

推荐使用 **Vercel** 进行零成本部署：
1. Fork 本仓库。
2. 在 Vercel 导入该仓库。
3. 框架预设选择 `Vite`。
4. 点击 Deploy 即可。

## 📄 许可证 | License

MIT License © 2026 Freakk
