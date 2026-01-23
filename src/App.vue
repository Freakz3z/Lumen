<template>
  <div>
    <!-- 加载动画 -->
    <div id="loading-box" :class="{ loaded: !isLoading }">
      <div class="loading-left-bg"></div>
      <div class="loading-right-bg"></div>
      <div class="spinner-box">
        <div class="loader">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
        <div class="loading-word">
          <p class="loading-title" id="loading-title">{{ config.title }}</p>
          <span id="loading-text">{{ loadingText }}</span>
        </div>
      </div>
    </div>

    <Background v-if="config.background_animation !== false" />
    <section
      id="section"
      class="section"
      :class="{ 'section-load': !isLoading }"
    >
      <!-- 背景图片 -->
      <div class="bg-all">
        <img id="bg" :class="{ 'loaded': !isLoading }" :src="bgUrl" @error="handleBgError" />
        <div class="cover" :class="{ 'loaded': !isLoading }"></div>
      </div>

      <!-- 鼠标指针 -->
      <div id="g-pointer-1"></div>
      <div id="g-pointer-2" ref="pointer2"></div>

      <!-- 主体内容 -->
      <main id="main" class="main">
        <div class="container" id="container">
          <div class="row" id="row" :class="{ 'hide-right': showMore }" style="width: 100%;">
            <div class="col left">
              <!--基本信息-->
              <div class="main-left">
                <!--Logo-->
                <div class="main-img">
                  <img
                    id="logo-img"
                    :src="resolveAsset(config.logo_img)"
                    alt="img"
                  />
                  <div class="img-title">
                    <span class="img-title-big" id="logo-text-1">{{
                      config.logo_text_1
                    }}</span>
                    <span class="img-text" id="logo-text-2"
                      >.{{ config.logo_text_2 }}</span
                    >
                    <!-- Typewriter -->
                    <div class="identity-box">
                      <span id="typed-output"></span>
                    </div>
                  </div>
                </div>
                <!--介绍信息-->
                <div class="message cards" id="switchmore" @click="handleSwitchMore">
                  <div class="des" id="des">
                    <i class="fa-solid fa-quote-left"></i>
                    <div class="des-title">
                        <TransitionGroup name="list" tag="div" style="position:relative; width:100%; height: 5rem; overflow:hidden;">
                            <div v-for="item in messageList" :key="item.id" class="message-item" style="width:100%; height: 2.5rem; line-height: 2.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                <span v-html="item.text"></span>
                            </div>
                            <!-- Fallback/Default when no list (not playing or init) -->
                            <div v-if="messageList.length === 0" key="default-title" class="message-item" style="height: 2.5rem; line-height: 2.5rem;">
                                <span v-html="messageTitle"></span>
                            </div>
                            <div v-if="messageList.length === 0" key="default-text" class="message-item" style="height: 2.5rem; line-height: 2.5rem;">
                                <span v-html="messageText"></span>
                            </div>
                        </TransitionGroup>
                    </div>
                    <i class="fa-solid fa-quote-right"></i>
                  </div>
                </div>
                <!--社交链接-->
                <div class="social" id="social">
                  <a
                    v-if="config.github"
                    :href="'https://github.com/' + config.github"
                    class="link"
                    id="github"
                    target="_blank"
                    title="Github"
                  >
                    <i class="fa-brands fa-github"></i>
                  </a>
                  
                  <a
                    v-if="config.qq"
                    :href="'http://wpa.qq.com/msgrd?v=3&uin=' + config.qq + '&site=qq&menu=yes'"
                    class="link"
                    id="qq"
                    target="_blank"
                    title="QQ"
                  >
                    <i class="fa-brands fa-qq"></i>
                  </a>
                  
                  <a
                    v-if="config.email"
                    :href="'mailto:' + config.email"
                    class="link"
                    id="email"
                    target="_blank"
                    title="Email"
                  >
                    <i class="fa-solid fa-envelope"></i>
                  </a>
                   <a
                    v-if="config.bilibili"
                    :href="'https://space.bilibili.com/' + config.bilibili"
                    class="link"
                    id="bilibili"
                    target="_blank"
                    title="Bilibili"
                  >
                    <i class="fa-brands fa-bilibili"></i>
                  </a>
                  <a
                    v-if="config.telegram"
                    :href="'https://t.me/' + config.telegram"
                    class="link"
                    id="telegram"
                    target="_blank"
                    title="Telegram"
                  >
                    <i class="fa-brands fa-telegram"></i>
                  </a>

                  <a class="link" id="message-board-btn" @click="showMessageBoard = true" style="cursor: pointer;" title="留言板">
                     <i class="fa-solid fa-comments"></i>
                  </a>
                  
                  <a id="link-text" class="link-text" :href="config.email ? 'mailto:' + config.email : 'javascript:;'">
                    通过这里联系我
                  </a>
                </div>
              </div>
            </div>

            <!-- right col -->
            <div class="col right">
              <div class="main-right">
                <!--功能区-->
                <div class="row rightone" id="rightone">
                  <div class="col hitokotos">
                    <!--一言-->
                    <div
                      class="hitokoto cards"
                      id="hitokoto"
                      v-show="!showMusic"
                      @click="getHitokoto(true)"
                      @mouseenter="isHitokotoHover = true"
                      @mouseleave="isHitokotoHover = false"
                    >
                      <!--切换音乐-->
                      <div
                        class="open-music fixed-top"
                        id="open-music"
                        v-show="isHitokotoHover"
                        @click.stop="showMusic = true"
                        style="display: flex;"
                      >
                        <i class="fa-solid fa-compact-disc"></i>
                        <span>&nbsp;打开音乐播放器</span>
                      </div>
                      <div class="hitokoto-all">
                        <div class="hitokoto-text">
                          <span id="hitokoto_text">{{ hitokoto.text }}</span>
                        </div>
                        <div class="hitokoto-from">
                          -「&nbsp;<span id="from_text">{{ hitokoto.from }}</span
                          >&nbsp;」
                        </div>
                      </div>
                    </div>
                    <!--音乐-->
                    <MusicPlayer 
                        ref="musicPlayerRef"
                        :show="showMusic" 
                        @close="showMusic = false" 
                        @open-box="openBox"
                        @update-lyrics="updateLyrics"
                        @update-progress="updateProgress"
                        @play="handlePlay"
                        @pause="handlePause"
                        @load-lrc="handleLoadLrc"
                        @time-update="handleTimeUpdate"
                        :target-container="aplayerContainer"
                    />
                  </div>

                  <div class="col times">
                    <!--时间-->
                    <div class="time cards" id="upWeather" @click="updateWeather(true)">
                      <div class="timeshow" id="time">
                        {{ timeData.year }}&nbsp;年&nbsp;{{
                          timeData.month
                        }}&nbsp;月&nbsp;{{ timeData.day }}&nbsp;日&nbsp;<span
                          class="weekday"
                          >{{ timeData.weekday }}</span
                        ><br /><span class="time-text">{{
                          timeData.timeText
                        }}</span>
                      </div>
                      <div class="weather">
                        <span id="city_text">{{ weather.city }}</span>&nbsp;
                        <span id="wea_text">{{ weather.text }}</span>&nbsp;
                        <span id="tem_text" v-if="weather.temp">{{ weather.temp }}°C&nbsp;</span>
                        <span id="win_text">{{ weather.windDir }}</span>
                        <span id="win_speed" v-if="weather.windScale">{{ weather.windScale }}级</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--分隔线-->
                <div class="line">
                  <i class="fa-solid fa-link"></i>
                  <span class="line-text">网站列表</span>
                </div>
                <!--网站链接-->
                <div class="link">
                  <div class="row">
                      <div class="col" v-for="i in 3" :key="i">
                          <a :href="config[`link_${i}`][0]" target="_blank">
                              <div class="link-card cards">
                                  <i :id="`link-icon-${i}`" :class="config[`link_${i}`][1]"></i>
                                  <span class="link-name" :id="`link-name-${i}`">{{ config[`link_${i}`][2] }}</span>
                              </div>
                          </a>
                      </div>
                  </div>
                   <div class="row" style="margin-top: 1.5rem;">
                      <div class="col" v-for="i in 3" :key="i+3">
                          <a :href="config[`link_${i+3}`][0]" target="_blank">
                              <div class="link-card cards">
                                  <i :id="`link-icon-${i+3}`" :class="config[`link_${i+3}`][1]"></i>
                                  <span class="link-name" :id="`link-name-${i+3}`">{{ config[`link_${i+3}`][2] }}</span>
                              </div>
                          </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--展开菜单按钮-->
          <div class="menu" id="switchmenu">
            <a class="munu-button cards" id="menu" @click="showMore = true">
              <i class="fa-solid fa-bars"></i>
            </a>
          </div>
        </div>

          <!--更多内容-->
          <div
            class="more"
            id="more"
            v-show="showMore"
          >
            <!--关闭按钮-->
            <div class="close fixed-top" id="close" @click="handleSwitchMore">
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <div class="line" style="margin-top: 1rem">
              <i class="fa-solid fa-angle-left"></i>
              <span class="line-text">时间胶囊</span>
              <i class="fa-solid fa-angle-right"></i>
            </div>
            <div class="date" id="date">
              <div class="item" id="dayProgress">
                <div class="date-text" style="margin-top: 0rem">
                  今日已经度过了&nbsp;<span>{{ capsule.dayPass }}</span
                  >&nbsp;小时
                </div>
                <div class="progress">
                  <div
                    class="progress-bar"
                    :style="{ width: capsule.dayPercent + '%' }"
                  ></div>
                </div>
              </div>
              <div class="item" id="weekProgress">
                <div class="date-text">
                  本周已经度过了&nbsp;<span>{{ capsule.weekDay }}</span
                  >&nbsp;天
                </div>
                <div class="progress">
                  <div
                    class="progress-bar"
                    :style="{ width: capsule.weekPercent + '%' }"
                  ></div>
                </div>
              </div>
              <div class="item" id="monthProgress">
                <div class="date-text">
                  本月已经度过了&nbsp;<span>{{ capsule.monthDay }}</span
                  >&nbsp;天
                </div>
                <div class="progress">
                  <div
                    class="progress-bar"
                    :style="{ width: capsule.monthPercent + '%' }"
                  ></div>
                </div>
              </div>
              <div class="item" id="yearProgress">
                <div class="date-text">
                  今年已经度过了&nbsp;<span>{{ capsule.yearMonth }}</span
                  >&nbsp;个月
                </div>
                <div class="progress">
                  <div
                    class="progress-bar"
                    :style="{ width: capsule.yearPercent + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="line">
              <i class="fa-solid fa-angle-left"></i>
              <span class="line-text">个性化设置</span>
              <i class="fa-solid fa-angle-right"></i>
            </div>
            
             <!-- Settings moved here -->
            <div class="settings-simple" style="width: 100%; max-width: 400px; margin: 0 auto 20px;">
                <div class="setting-item">
                    <div class="setting-title" style="color:white; margin-bottom: 15px; font-weight:bold; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px;">
                        <i class="fa-solid fa-image"></i> 壁纸设置
                    </div>
                    <div class="set">
                        <div class="wallpaper" id="wallpaper" style="justify-content: center;">
                            <div class="form-radio">
                                <input type="radio" class="set-wallpaper" id="radio1" value="1" name="wallpaper-type" v-model="wallpaperType">
                                <label for="radio1">默认壁纸</label>
                            </div>
                            <div class="form-radio">
                                <input type="radio" class="set-wallpaper" id="radio2" value="2" name="wallpaper-type" v-model="wallpaperType">
                                <label for="radio2" id="wallpaper_text1">每日一图</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        
        <!-- 更多页面 (Box - Settings & Music) -->
        <div class="box" id="box" v-show="showBox" style="display: block;">
            <div class="box-wrapper">
                <!--关闭按钮-->
                <div class="closebox fixed-top" id="closemore" @click="showBox = false">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <!--左侧内容-->
                <div class="box-left">
                    <!-- APlayer-like Lyrics Container -->
                     <!-- We rename "box-lrc-container" to imply styling or just add style -->
                     <!-- Flex:1 makes it fill the left side -->
                    <div class="box-lrc-container" style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; position:relative; overflow:hidden;">
                        
                         <!-- Default Welcome -->
                        <div v-if="!playingLrc" style="text-align:center; opacity:0.8; height: 100%; display: flex; flex-direction: column; justify-content: center; width: 100%;">
                             <div class="img-title" style="margin-bottom: 2rem;">
                                <span class="img-title-big" id="logo-title-other">{{ config.logo_text_1 }}</span>
                                <span class="img-text" id="logo-title-other-small">.{{ config.logo_text_2 }}</span><br/>
                                <span class="img-text">&nbsp;v&nbsp;2.0</span>
                                <a :href="'https://github.com/' + config.github" target="_blank" style="margin-left: 0.5rem; color: inherit;">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                             <p>{{ t('record_day') }}</p>
                             <p>{{ t('cherish_moment') }}</p>
                             <p>{{ t('hope_happy') }}</p>
                             
                             <div class="lang-switch" style="margin-top: 1rem; cursor: pointer; font-size: 0.9rem; opacity: 0.8;">
                                 <span @click="locale = 'zh'" :style="{ fontWeight: locale === 'zh' ? 'bold' : 'normal' }">CN</span>
                                 &nbsp;|&nbsp;
                                 <span @click="locale = 'en'" :style="{ fontWeight: locale === 'en' ? 'bold' : 'normal' }">EN</span>
                             </div>
                        </div>

                         <!-- Lyrics Flow -->
                        <div v-else class="lrc-scroll-box" style="height: 65vh; width: 100%; overflow: hidden; position: relative; margin: auto;">
                             <!-- Gradient Mask for fade effect top/bottom -->
                             <div class="lrc-mask-top" style="position:absolute; top:0; left:0; width:100%; height:15%; background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, transparent 100%); z-index:2; pointer-events:none;"></div>
                             
                             <ul :style="{ transform: `translateY(${lrcTranslateY})`, transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }" 
                                 style="list-style:none; padding:0; margin:0; text-align:center; width: 100%;">
                                <li v-for="(line, index) in fullLrcList" :key="index" 
                                    :class="{ 'lrc-active': index === currentLrcIndex }"
                                    style="padding: 10px 0; transition: all 0.4s; font-size: 16px; line-height: 24px; color: rgba(255,255,255,0.4); min-height: 44px;">
                                    <span style="display:inline-block; max-width: 90%;">{{ line.text }}</span>
                                </li>
                            </ul>
                            
                            <div class="lrc-mask-bottom" style="position:absolute; bottom:0; left:0; width:100%; height:15%; background: linear-gradient(to top, rgba(255,255,255,0) 0%, transparent 100%); z-index:2; pointer-events:none;"></div>
                        </div>
                    </div>
                </div>
                <!--Aplayer Container-->
                <div class="box-right">
                    <div id="aplayer-box" ref="aplayerContainer"></div>
                </div>
            </div>
        </div>
      </main>
      
      <!-- Footer -->
      <footer id="footer" class="fixed-bottom footer" style="position:fixed; bottom:0; width:100%; z-index:999;">
        <div class="power" v-show="!playingLrc">
            <span id="power">Copyright&nbsp;&copy;
                {{ timeData.year }}
                <a href="#" id="power-text">{{ config.author }}</a>
            </span>
            <!-- 备案信息 -->
             <span id="beian" v-if="config.beian">
                 &amp;&nbsp;
                 <a href="https://beian.miit.gov.cn/" target="_blank">{{ config.beian }}</a>
             </span>
        </div>
        <!-- 歌词显示 -->
        <div id="lrc" v-show="playingLrc" style="position:relative; z-index:1001;">
             <div class="lrc-container" v-html="currentLrc"></div>
        </div>
         <!-- 进度条 -->
         <div class="music-progress" v-show="playingLrc" style="position:absolute; bottom:0; left:0; width:100%; height:100%; cursor:pointer; z-index: 1000;">
             <div class="bar" :style="{width: musicProgress + '%', height:'100%', background:'rgba(255,255,255,0.2)'}"></div>
             <input type="range" min="0" max="100" step="0.1" v-model="musicProgress" @change="handleSeek" @mousedown="isSeeking = true" @mouseup="finishSeek" @touchstart="isSeeking = true" @touchend="finishSeek"
              style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:pointer;" />
         </div>
      </footer>
      <MessageBoard :show="showMessageBoard" :config="config.giscus" @close="showMessageBoard = false" />
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import iziToast from "izitoast";
import Typed from "typed.js";
import MessageBoard from "./components/MessageBoard.vue";
import Background from "./components/Background.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import configData from "../setting.json";
import { useTime } from "./composables/useTime";
import { useWeather } from "./composables/useWeather";

// Config & State
const { t, locale } = useI18n();
const config = reactive(configData);
const isLoading = ref(true);
const loadingState = ref(0);
const loadingText = computed(() => loadingState.value === 0 ? t('loading') : t('font_tip'));
const showMore = ref(false);
const showBox = ref(false);
const showMessageBoard = ref(false);
const showMusic = ref(localStorage.getItem('music_open') === 'true');
watch(showMusic, (val) => localStorage.setItem('music_open', val));
const isHitokotoHover = ref(false);
const wallpaperType = ref("1");
const aplayerContainer = ref(null);
const playingLrc = ref(false);
const currentLrc = ref("");
const musicProgress = ref(0);
const isSeeking = ref(false);
const musicPlayerRef = ref(null);

// Composables
const { timeData, capsule } = useTime();
const { weather, updateWeather } = useWeather();


// Lyrics Scrolling Logic
const fullLrcList = ref([]);
const currentLrcIndex = ref(0);
const boxLeftHeight = ref(400); // Approximate default height, can be dynamic
const lrcTranslateY = computed(() => {
    // Container is 65vh. Center is 32.5vh.
    // Standard line height = 24px + 20px padding = 44px.
    // Active line is larger, purely visual center adjustment ~30px.
    return `calc(32.5vh - 30px - ${currentLrcIndex.value * 44}px)`;
});

const handleLoadLrc = (list) => {
    fullLrcList.value = list;
    currentLrcIndex.value = 0;
};

const handleTimeUpdate = (time) => {
    if (!fullLrcList.value || fullLrcList.value.length === 0) return;
    let idx = -1;
    for (let i = 0; i < fullLrcList.value.length; i++) {
        if (fullLrcList.value[i].time <= time) {
            idx = i;
        } else {
            break;
        }
    }
    if (idx !== -1 && idx !== currentLrcIndex.value) {
        currentLrcIndex.value = idx;
    }
};

const updateProgress = (pct) => {
    if(!isSeeking.value) {
        musicProgress.value = pct;
    }
}

const handleSeek = () => {
    if (musicPlayerRef.value) {
        musicPlayerRef.value.seek(musicProgress.value);
    }
}

const finishSeek = () => {
    setTimeout(() => {
        isSeeking.value = false;
    }, 500);
}

// Background Image Handling
const bgImages = import.meta.glob('./assets/img/background*.webp', { eager: true, import: 'default' })
// Icon Images Handling for dynamic paths
const iconImages = import.meta.glob('./assets/img/icon/*', { eager: true, import: 'default' });

const bgUrl = ref(""); 
const pointer2 = ref(null);

const resolveAsset = (path) => {
  if (path && path.startsWith("./assets")) {
    // Attempt to match from glob
    // Path example: ./assets/img/icon/avatar.jpg
    // glob keys: ./assets/img/icon/avatar.jpg
    if (iconImages[path]) {
        return iconImages[path];
    }
    // Fallback for simple new URL if mapped but not in glob (e.g. background)
    // But backgrounds are handled separately by setBg. 
    // This resolveAsset is mostly for logo.
    
    // For backgrounds not in icon folder:
    if(bgImages[path]) {
        return bgImages[path];
    }
    
    // Last resort
    return new URL(path, import.meta.url).href;
  }
  return path;
};

// Weather (Moved to composable)

// Hitokoto
const hitokoto = reactive({
  text: "每一个人都应该明确自己的方向和位置",
  from: "Freakk",
});

// Time & Capsule (Moved to composable)


const switchMore = () => {
    // Legacy function placeholder, replaced by handleSwitchMore
}
// Add reactive state for the message card
const messageTitle = computed(() => showMore.value ? t('oops') : t('hello_world'));
const messageText = computed(() => showMore.value ? t('oops_desc') : t('site_desc'));

// Update switchMore to toggle text
const handleSwitchMore = () => {
    showMore.value = !showMore.value;
    // Computed props handle text updates automatically now
}

const nextLrc = ref("");

// Methods
const handleBgError = (e) => {
    e.target.classList.add('error');
};

let lastHitokotoTime = 0;
const getHitokoto = (showToast = false) => {
  const now = Date.now();
  if (showToast && now - lastHitokotoTime < 2000) {
      iziToast.show({
          message: "你点的太快了",
          icon: "fa-solid fa-triangle-exclamation"
      });
      return;
  }
  if (showToast) lastHitokotoTime = now;
  
  if (showToast) {
      iziToast.show({
          message: "一言正在更新",
          icon: "fa-solid fa-arrows-rotate fa-spin",
          timeout: 2000
      });
  }

  fetch("https://v1.hitokoto.cn?max_length=24")
    .then((res) => res.json())
    .then((data) => {
      hitokoto.text = data.hitokoto;
      hitokoto.from = data.from;
      if (showToast) {
          iziToast.show({
              message: "一言已经更新",
              icon: "fa-solid fa-pen-nib"
          });
      }
    })
    .catch(() => {
        if (showToast) {
            iziToast.show({
              message: "一言获取失败",
              icon: "fa-solid fa-xmark"
          });
        }
    });
};


// Functions for Box
const openBox = () => {
    showBox.value = true;
}
const closeBox = () => {
    showBox.value = false;
}

const messageList = ref([]);
let msgCounter = 0;
// Track strict last Lrc to prevent jitter
const lastLrcText = ref("");

const updateLyrics = (lrc, next) => {
    // Basic de-bounce: if exact same text, ignore
    if (lastLrcText.value === lrc) return;
    lastLrcText.value = lrc;
    
    // Normalize logic
    const safeLrc = lrc.trim();
    const safeNext = next ? next.trim() : "";

    // Current lrc and next lrc
    currentLrc.value = `<span class='lrc-show'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg>&nbsp;${safeLrc}&nbsp;<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg></span>`;
    
    // Update message card logic with list for TransitionGroup
    if(playingLrc.value) {
        // We want a list of [current, next]
        // When updating, we replace the whole list?
        // No, to animate, we need stability.
        // Old: [A, B]
        // New: [B, C]
        // If we assign messageList.value = [{text: B, id: oldB_id}, {text: C, id: newId}]
        // Vue: A removed, B moved 0->0 (wait, usually we want A to leave 0, B to move 1->0, C to enter 1)
        
        // Wait, index stability.
        // If messageList is [A, B].
        // Next frame messageList is [B, C].
        
        // If we REUSE the object for B, Vue knows it's the same item.
        
        let newItemB = null;
        if(messageList.value.length >= 2) {
             const oldB = messageList.value[1];
             // Compare with trimmed
             if(oldB.text === safeLrc) {
                 newItemB = oldB;
             }
        }
        
        if(!newItemB) {
            // First run or jump
             messageList.value = [
                 { text: safeLrc, id: msgCounter++ },
                 { text: safeNext, id: msgCounter++ }
             ];
        } else {
             // Shift
             messageList.value = [
                 newItemB,
                 { text: safeNext, id: msgCounter++ }
             ];
        }
    }
}


// We need to ensure that when music plays, playingLrc is true
// This is handled by handlePlay event
const handlePlay = (songName) => {
    playingLrc.value = true;
    if (songName) {
        iziToast.show({
            title: "正在播放",
            message: songName,
            icon: "fa-solid fa-compact-disc"
        });
    }
}
const handlePause = () => {
    playingLrc.value = false;
    // Clear message list to show default text
    messageList.value = [];
    // Restore Hello World
    // handled by computed
    showMore.value = false;
}


// Background Handling
const setBg = (type) => {
    wallpaperType.value = type;
    // Save to local storage (optional)
    localStorage.setItem('wallpaperType', type);

    if (type === '1') {
        const randomNum = 1 + Math.floor(Math.random() * 10);
        const key = `./assets/img/background${randomNum}.webp`;
        // Check if key exists in glob
        if (bgImages[key]) {
             bgUrl.value = bgImages[key];
        } else {
             // Fallback
             bgUrl.value = new URL(`./assets/img/background1.webp`, import.meta.url).href;
        }
    } else if (type === '2') {
        bgUrl.value = "https://api.dujin.org/bing/1920.php";
    } else if (type === '3') {
        bgUrl.value = "https://api.ixiaowai.cn/gqapi/gqapi.php"; // Landscape
    } else if (type === '4') {
        bgUrl.value = "https://api.ixiaowai.cn/api/api.php"; // Anime
    }
}

// Watch for changes if needed, but since we init, we can just call setBg for initial load
watch(wallpaperType, (newVal) => {
    setBg(newVal);
});

// iziToast Defaults to Glass
iziToast.settings({
    class: 'iziToast-glass', // apply glass style by default
    position: 'topRight',
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutRight',
    progressBar: false,
    close: false,
    timeout: 3000
});

// Greetings
const hello = () => {
    const hour = new Date().getHours();
    let message = "";
    if (hour >= 6 && hour < 12) message = "早上好！又是元气满满的一天";
    else if (hour >= 12 && hour < 14) message = "中午好！吃过午饭了吗？";
    else if (hour >= 14 && hour < 19) message = "下午好！";
    else if (hour >= 19 && hour < 23) message = "晚上好！";
    else message = "夜深了，早点休息";
    
    iziToast.show({
        title: "哈喽",
        message: message,
        icon: "fa-solid fa-hand-spock"
    });
};

onMounted(() => {
  hello();

  // Typewriter Init
  if (config.who_am_i_1) {
    const strings = [];
    if(config.who_am_i_1) strings.push(config.who_am_i_1);
    if(config.who_am_i_2) strings.push(config.who_am_i_2);
    if(config.who_am_i_3) strings.push(config.who_am_i_3);
    
    new Typed('#typed-output', {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
        showCursor: true,
    });
  }

  // Init Wallpaper
  const savedType = localStorage.getItem('wallpaperType') || '1';
  setBg(savedType);

  // Mobile Check (simple)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

  // Mouse Pointer Logic & Right Click
  const body = document.querySelector("body");
  const p2 = pointer2.value;
  if(p2) {
      if (!isMobile) {
          // Enable custom pointer only on desktop
          body.addEventListener('mousemove', (e) => {
            window.requestAnimationFrame(() => {
                 p2.style.transform = `translate(${e.clientX - 9}px, ${e.clientY - 9}px)`;
            });
          });
          
          // Disable right click on desktop
          document.oncontextmenu = function(){ return false; };
      } else {
          // Hide custom pointer on mobile
          p2.style.display = 'none';
      }
  }

  // Init
  getHitokoto();
  
  // Note: time and weather are handled by useTime() and useWeather() composables

  // Loading Fake Delay
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
  
  setTimeout(() => {
    // loadingText logic
    loadingState.value = 1;
  }, 3000);
});

onUnmounted(() => {
    // Intervals cleared in composables
})
</script>

<style>
/* Active Lyrics Style */
.lrc-active {
    font-size: 1.4rem !important;
    font-weight: bold;
    color: #fff !important;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
    transform: scale(1.05); /* Optional: slight scale up */
}
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.hide-right .col.right {
    display: none !important;
}

/* Rolling Lyrics Animation (List) */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(100%); 
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.message-item {
    display: block;
    width: 100%;
    /* Ensure height matches line-height or container to prevent jumping */
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
