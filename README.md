<div align="center">
  <img src="./src/assets/img/icon/avatar.jpg" width="120" height="120" style="border-radius: 50%; box-shadow: 0 0 15px rgba(0,0,0,0.2);" alt="Logo">
  <h1>Freakk Personal Page (Vue Refactor)</h1>
  <p>
    一个基于 <b>Vue 3</b> + <b>Vite</b> 重构的现代化、高颜值个人主页
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
    <a href="https://giscus.app/">
      <img src="https://img.shields.io/badge/Giscus-Enabled-success?style=flat-square" alt="Giscus">
    </a>
  </p>
</div>

---

## 📖 简介 | Introduction

这是一个简洁、美观且功能丰富的个人主页项目。原项目基于 HTML/jQuery 开发，现已完全使用 **Vue 3 Composition API** + **Vite** 进行重构。
它集成了音乐播放器、留言板、实时天气、时光胶囊、动态粒子背景等功能，并针对移动端进行了深度适配，提供如原生应用般的丝滑体验。

## ✨ 功能特性 | Features

- ⚡️ **现代技术栈** - 采用 Vue 3 + Vite 构建，秒级启动，热更新飞快。
- 📱 **全端适配** - 完美响应式设计，PC 端宽屏展示，移动端沉浸式体验。
- 🎵 **沉浸式音乐体验** - 升级版音乐模式，拥有独立的 **歌词滚动** 界面，支持歌词拖拽定位、高亮强调、淡入淡出动效。
- 💬 **互动留言板** - 集成 **Giscus** 评论系统，基于 GitHub Discussions，无需后端数据库，安全稳定。
- ✨ **动态特效** - 优雅的 Canvas 粒子背景连线动画，提升视觉质感。
- 🔗 **社交聚合** - 智能解析 QQ、Email、Telegram 等社交链接，一键直达。
- 🌤 **实时天气** - 自动定位并展示实时气象信息（基于和风天气/MXNZP API）。
- ⏳ **时光胶囊** - 可视化展示今日、本周、本月、今年的“时间进度”，提醒珍惜当下。
- 🎨 **个性化壁纸** - 支持本地壁纸、必应每日一图、动漫/风景随机 API 切换，配置持久化存储。
- ⚙️ **极简配置** - 所有配置均集中在根目录的 `setting.json`，修改即生效。

## 🚀 快速开始 | Quick Start

### 环境要求
- Node.js > 16.0
- npm / yarn / pnpm

### 1. 安装依赖
```bash
npm install
```

### 2. 开发环境启动
```bash
npm run dev
```

### 3. 生产环境构建
```bash
npm run build
```

构建产物位于 `dist` 目录，可直接部署到任何静态服务器。

## ⚙️ 配置说明 | Configuration

项目的所有个性化配置均位于根目录下的 `setting.json` 文件中。

### 基础信息与音乐配置
```json
{
    "title": "网站标题",
    "description": "Meta描述",
    "author": "你的名字",
    "logo_img": "./assets/img/icon/avatar.jpg",
    
    // 社交链接配置 (自动显示图标)
    "github": "您的Github用户名",
    "qq": "您的QQ号",
    "email": "您的邮箱地址",
    "bilibili": "B站UID (可选)",
    "telegram": "Telegram用户名 (可选)",
    
    // 快捷链接配置 [URL, FontAwesome图标Class, 显示名称]
    "link_1": ["https://xx.com", "fa-solid fa-blog", "博客"],
    
    // 音乐播放器配置
    "music_server": "netease",      // 服务商: netease(网易云), tencent(QQ音乐)
    "music_type": "playlist",       // 类型: playlist(歌单), song(单曲)
    "music_id": "3778678",          // 歌单ID 或 歌曲ID
    "music_api": "https://api.injahow.cn/meting/", // Meting API 地址
    
    "Copyright_text": "页脚版权文字"
}
```

### 留言板配置 (Giscus)
在 `setting.json` 中配置您的 Giscus 信息，未配置则不会显示留言入口。
获取配置请访问：[https://giscus.app/zh-CN](https://giscus.app/zh-CN)

```json
"giscus": {
    "repo": "UserName/RepoName",  // 仓库全名
    "repoId": "R_kgD...",         // 仓库 ID
    "category": "General",        // Discussion 分类
    "categoryId": "DIC_kw..."     // 分类 ID
}
```

## ☁️ 部署 | Deployment

### 阿里云 ESA (Edge Serverless Architecture)
本项目包含 `esa.jsonc` 配置文件，支持直接部署到阿里云边缘计算节点。
```bash
# 构建
npm run build
# 使用 ESA CLI 部署
esa deploy
```

### Vercel / Netlify
本项目包含 `vercel.json`，可直接连接 GitHub 仓库自动部署。

## 🛠 技术栈 | Tech Stack

- **核心框架**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 样式**: [Bootstrap 5](https://getbootstrap.com/) + Custom CSS
- **音乐播放**: [APlayer](https://github.com/DIYgod/APlayer) + [MetingJS](https://github.com/metowolf/MetingJS)
- **评论系统**: [Giscus](https://giscus.app/)
- **图标库**: [FontAwesome 6](https://fontawesome.com/)
- **消息提示**: [iziToast](https://izitoast.marcelodolce.com/)

## 📄 许可证 | License

MIT License © 2026 Freakk
