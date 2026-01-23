<div align="center">
  <img src="./src/assets/img/icon/avatar.jpg" width="100" height="100" style="border-radius: 50%;" alt="Logo">
  <h1>Freakk Personal Page (Vue)</h1>
  <p>
    A stylish personal homepage refactored with <b>Vue 3</b> + <b>Vite</b>
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

## 📖 Introduction

This is a clean, beautiful, and feature-rich personal homepage project. Originally built with HTML/jQuery, it has been completely refactored using **Vue 3 Composition API** + **Vite**.
It integrates a music player, real-time weather, a "Time Capsule", dynamic wallpapers, and more. It is also deeply optimized for mobile devices, providing a silky-smooth experience similar to native apps.

## ✨ Features

- ⚡️ **Modern Tech Stack** - Built with Vue 3 + Vite for instant startup and lightning-fast HMR.
- 📱 **Fully Responsive** - Perfect display across PC, tablets, and mobile (Immersive full-screen experience on mobile).
- 🎵 **Music Player** - Built-in APlayer with Meting API support (Netease/QQ Music playlists), featuring rolling lyrics, drag-to-seek, and list management.
- 🌤 **Real-time Weather** - Automatic location detection and weather display via QWeather/MXNZP APIs.
- ⏳ **Time Capsule** - Visualizes the progress of the day, week, month, and year to remind you to cherish time.
- 🎨 **Dynamic Wallpapers** - Supports switching between local wallpapers, Bing Daily Image, and Anime/Landscape Random APIs, with persistent storage.
- ⚙️ **Simple Config** - Customize site info, links, and social media quickly via `setting.json`.

## 🚀 Quick Start

### Prerequisites
- Node.js > 16.0
- npm / yarn / pnpm

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📂 Folder Structure

```
src/
├── assets/          # Static assets (css, img, fonts, icons)
│   ├── css/         # Global styles, animations, mobile adapters
│   └── img/         # Backgrounds, icons
├── components/      # Vue Components
│   └── MusicPlayer.vue  # APlayer wrapper component
├── App.vue          # Main App Logic (Layout, State, Interactions)
├── main.js          # Entry point
└── setting.json     # Configuration file
```

## ⚙️ Configuration

All personal configurations are located in `src/setting.json`.
You can directly modify this file to customize:

```json
{
    "title": "Site Title",
    "description": "Site Description",
    "author": "Your Name",
    "logo_img": "Path to Avatar",
    "github": "Github Username",
    "link_1": ["URL", "Icon Class", "Link Name"],
    // ...more links
}
```

## 🛠 Tech Stack

- **Core**: [Vue.js 3](https://vuejs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Framework**: [Bootstrap 5](https://getbootstrap.com/) (Grid & Base styles)
- **Music**: [APlayer](https://github.com/DIYgod/APlayer)
- **Notifications**: [iziToast](https://izitoast.marcelodolce.com/)
- **Icons**: [FontAwesome 6](https://fontawesome.com/)

## 📄 License

MIT License © 2024 Freakk
