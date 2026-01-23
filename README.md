<div align="center">
  <img src="./src/assets/img/icon/avatar.jpg" width="100" height="100" style="border-radius: 50%;" alt="Logo">
  <h1>Freakk Personal Page (Vue)</h1>
  <p>
    基于 <b>Vue 3</b> + <b>Vite</b> 重构的高颜值个人主页
  </p>
  
  <p>
    <a href="https://vuejs.org/">
      <img src="https://img.shields.io/badge/vue-3.x-42b883.svg" alt="Vue 3">
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/vite-5.x-646cff.svg" alt="Vite">
    </a>
    <a href="https://getbootstrap.com/">
      <img src="https://img.shields.io/badge/bootstrap-5.x-purple.svg" alt="Bootstrap 5">
    </a>
  </p>
</div>

## 📖 简介 | Introduction

这是一个简洁、美观且功能丰富的个人主页项目。原项目基于 HTML/jQuery 开发，现已完全使用 **Vue 3 Composition API** + **Vite** 进行重构。
它集成了音乐播放器、实时天气、时光胶囊、动态壁纸等功能，并针对移动端进行了深度适配，提供如原生应用般的丝滑体验。

## ✨ 功能特性 | Features

- ⚡️ **现代技术栈** - 采用 Vue 3 + Vite 构建，秒级启动，热更新飞快。
- 📱 **全端适配** - 完美响应式设计，在 PC、平板、手机上均有出色表现（移动端沉浸式全屏体验）。
- 🎵 **音乐播放器** - 内置 APlayer，支持 Meting API（网易云/QQ音乐歌单），具备歌词滚动、进度拖拽、列表管理功能。
- 🌤 **实时天气** - 基于和风天气/MXNZP API，自动定位并展示实时气象信息。
- ⏳ **时光胶囊** - 可视化展示今日、本周、本月、今年的“时间进度”，提醒珍惜当下。
- 🎨 **个性化壁纸** - 支持本地壁纸、必应每日一图、动漫/风景随机 API 切换，配置持久化存储。
- ⚙️ **极简配置** - 通过 `setting.json` 即可快速定制站点信息、链接和社交媒体。

## 🚀 快速开始 | Quick Start

### 环境要求
- Node.js > 16.0
- npm / yarn / pnpm

### 安装依赖
```bash
npm install
```

### 开发环境启动
```bash
npm run dev
```

### 生产环境构建
```bash
npm run build
```

## 📂 目录结构 | Folder Structure

```
src/
├── assets/          # 静态资源 (css, img, fonts, icons)
│   ├── css/         # 全局样式、动画及移动端适配
│   └── img/         # 背景图、图标等
├── components/      # Vue 组件
│   └── MusicPlayer.vue  # 音乐播放器组件封装
├── App.vue          # 主应用逻辑 (布局、状态管理、核心交互)
├── main.js          # 入口文件
└── setting.json     # 站点配置文件
```

## ⚙️ 配置说明 | Configuration

项目的所有个性化配置均位于 `src/setting.json` 文件中。
你可以直接修改该文件来自定义：

```json
{
    "title": "网站标题",
    "description": "网站描述",
    "author": "你的名字",
    "logo_img": "头像路径",
    "github": "Github用户名",
    "link_1": ["链接URL", "图标Class", "链接名称"],
    // ...更多链接
}
```

## 🛠 技术栈 | Tech Stack

- **核心框架**: [Vue.js 3](https://vuejs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 框架**: [Bootstrap 5](https://getbootstrap.com/) (Grid & Base styles)
- **音乐播放**: [APlayer](https://github.com/DIYgod/APlayer)
- **消息提示**: [iziToast](https://izitoast.marcelodolce.com/)
- **图标库**: [FontAwesome 6](https://fontawesome.com/)

## 📄 许可证 | License

MIT License © 2024 Freakk
