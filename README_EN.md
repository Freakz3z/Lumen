<div align="center">
  <img src="./src/assets/img/icon/avatar.jpg" width="120" height="120" style="border-radius: 50%; box-shadow: 0 0 15px rgba(0,0,0,0.2);" alt="Logo">
  <h1>Lumen</h1>
  <p>
    A modern, high-performance personal homepage refactored with <b>Vue 3</b> + <b>Vite</b>.
  </p>
  
  <p align="center">
    <span>English</span> | <a href="./README.md">简体中文</a>
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

## 📖 Introduction

This is a minimalist, aesthetic, and feature-rich personal homepage. Originally built with HTML/jQuery, it has been completely rewritten using **Vue 3 Composition API** + **Vite**.
It integrates functionalities like a music player, guestbook, real-time weather, time capsule, and dynamic particle backgrounds, all deeply optimized for a silky-smooth experience on both desktop and mobile devices.

## ✨ Features

### 🎨 Visual & UI
- **⚡️ Modern Stack** - Built with Vue 3 + Vite for instant load times and rapid development.
- **📱 Responsive Design** - Perfectly adapts to all screen sizes, offering an immersive full-screen experience on mobile.
- **💎 Glassmorphism** - Global **iziToast** notification system customized with frosted glass effects for sophisticated feedback.
- **⌨️ Identity Typewriter** - Features a `Typed.js` integration under the logo to cyclically display your multiple identities (e.g., Student, Developer).

### 🛠 Utilities
- **🎵 Immersive Music** - Integrated player with a dedicated lyrics panel, progress dragging, highlighting, and support for Netease/Tencent playlists.
- **🌦 Real-time Weather** - Automatically detects location and displays weather info with "Updating..." interactive feedback.
- **⏳ Time Capsule** - Visualizes the progress of the current day, week, month, and year to remind you to cherish every moment.
- **💬 Message Board** - **Giscus** powered comment system (GitHub Discussions based), secure and database-free.
- **👤 About Me** - Automatic GitHub README fetching and Markdown rendering to showcase your projects and tech stack.
- **🔗 Social Hub** - Smart aggregation of your social links (GitHub, QQ, Email, Bilibili, Telegram, etc.).

### ⚙️ System
- **🌸 Dynamic Background** - Upgraded Canvas-based "Sakura Falling" effect with physics simulation.
- **🖼 Wallpaper Switching** - Supports Local, Bing Daily modes with preference persistence.
- **🔧 Easy Config** - All configurations are centralized in `setting.json`. No code changes needed for personalization.

## 🚀 Quick Start

### Prerequisites
- Node.js > 16.0
- npm / yarn / pnpm

### 1. Clone
```bash
git clone https://github.com/Freakz3z/Lumen.git
cd Lumen
```

### 2. Install
```bash
npm install
```

### 3. Dev Server
```bash
npm run dev
```

### 4. Build
```bash
npm run build
```
Output files will be in `dist`.

## 📂 Project Structure

```
Lumen/
├── src/
│   ├── assets/             # Assets (css, img, fonts)
│   ├── components/         # Vue Components
│   │   ├── Background.vue  # Canvas Background
│   │   ├── MusicPlayer.vue # Player Logic
│   │   ├── MessageBoard.vue# Giscus wrapper
│   │   └── AboutMe.vue     # About Me component (GitHub README display)
│   ├── composables/        # Composition API Hooks
│   │   ├── useTime.js      # Time Logic
│   │   └── useWeather.js   # Weather Logic
│   ├── App.vue             # Main Entry
│   └── main.js             # Vue Init
├── setting.json            # Global Config
└── README_EN.md
```

## ⚙️ Configuration

All customizations are centralized in `setting.json` in the root directory. No code changes required.

### Complete Configuration Guide

#### 1. Basic Information
```json
{
    "title": "Lumen",                    // Website title
    "description": "A minimalist...",    // Meta description (SEO)
    "keywords": "Lumen,Personal Page",   // Meta keywords
    "author": "Freakk",                  // Author name (shown in footer)
    "Copyright_text": "Freakk"           // Copyright text
}
```

#### 2. Logo & Identity Display
```json
{
    "logo_img": "./assets/img/icon/avatar.jpg",  // Avatar path
    "logo_text_1": "Freakk",                      // Logo main title
    "logo_text_2": "",                            // Logo subtitle

    // Identity typewriter config (add 1-3, will loop)
    "who_am_i_1": "Student",
    "who_am_i_2": "Developer",
    "who_am_i_3": "Dreamer"
}
```

#### 3. Social Media Links
```json
{
    "github": "Freakz3z",              // GitHub username
    "qq": "3020517046",                // QQ number
    "email": "3020517046@qq.com",      // Email address
    "bilibili": "",                    // Bilibili UID (optional)
    "telegram": ""                     // Telegram username (optional)
}
```

#### 4. Custom Website Links (6 Quick Links)
```json
{
    // Format: ["URL", "FontAwesome icon class", "Display name"]
    "link_1": ["https://freakk.love/", "fa-solid fa-blog", "My Blog"],
    "link_2": ["https://github-wrapped4u.vercel.app/", "fa-solid fa-cloud", "GitHub Stats"],
    "link_3": ["https://vusic.xxx.com/", "fa-solid fa-music", "Music Visualizer"],
    "link_4": ["https://muse.xxx.com/", "fa-solid fa-book-bookmark", "English Assistant"],
    "link_5": ["https://lifecalendar.xxx.com/", "fa-solid fa-calendar-days", "Life Calendar"],
    "link_6": ["", "fa-solid fa-flask", "Coming Soon"]  // Leave empty to disable
}
```

#### 5. Music Player Configuration
```json
{
    "music_server": "netease",         // Music platform: netease, tencent, kugou, xiami, baidu
    "music_type": "playlist",          // Type: playlist, song, album, artist
    "music_id": "3778678",             // Corresponding ID (e.g., Netease playlist ID)
    "music_api": "https://api.injahow.cn/meting/"  // Meting API (usually no need to change)
}
```

**How to get playlist ID:**
1. Open Netease Cloud Music web player
2. Find your playlist, the number after `?id=` in the URL is the playlist ID

#### 6. Guestbook Configuration (Giscus)
```json
{
    "giscus": {
        "repo": "Freakz3z/Freakk-Personal-Page",  // GitHub repo (format: username/repo)
        "repoId": "R_kgDOQ_scEA",                 // Repository ID
        "category": "General",                     // Discussion category
        "categoryId": "DIC_kwDOQ_scEM4C1VBD"      // Category ID
    }
}
```

**How to get configuration:**
1. Visit [Giscus configuration page](https://giscus.app/)
2. Enter your repository information
3. Copy the generated config to `setting.json`

#### 7. GitHub README Display (New)
```json
{
    "github_readme": {
        "enabled": true,    // Enable or disable (true/false)
        "url": "https://raw.githubusercontent.com/Freakz3z/Freakz3z/main/README.md"
    }
}
```

**URL Format:**
- Must use `raw.githubusercontent.com` URL
- Format: `https://raw.githubusercontent.com/username/repo/branch/README.md`
- Supports all Markdown syntax, automatically parsed and rendered

#### 8. Other System Settings
```json
{
    "background_animation": true,  // Enable background animation (Sakura falling)
    "beian": ""                    // ICP license number (optional, shown in footer)
}
```

### Configuration Tips
- After modifying config, refresh the page in dev mode to see changes
- Remember to run `npm run build` before deployment
- All icons use [FontAwesome 6 Free](https://fontawesome.com/search?o=r&m=free)
- Music cover art and lyrics are automatically fetched from Meting API

## ☁️ Deployment

**Vercel** is recommended:
1. Fork this repo.
2. Import to Vercel.
3. Select `Vite` preset.
4. Deploy.

## 📄 License

MIT License © 2026 Freakk
