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
                  </div>
                </div>
                <!--介绍信息-->
                <div class="message cards" id="switchmore" @click="handleSwitchMore">
                  <div class="des" id="des">
                    <i class="fa-solid fa-quote-left"></i>
                    <div class="des-title">
                        <TransitionGroup name="list" tag="div" style="position:relative; width:100%; height: 5rem; overflow:hidden;">
                            <div v-for="item in messageList" :key="item.id" class="message-item" style="width:100%; line-height: 2.5rem;">
                                <span v-html="item.text"></span>
                            </div>
                            <!-- Fallback/Default when no list (not playing or init) -->
                            <div v-if="messageList.length === 0" key="default-title" class="message-item">
                                <span v-html="messageTitle"></span>
                            </div>
                            <div v-if="messageList.length === 0" key="default-text" class="message-item">
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
                    :href="'https://github.com/' + config.github"
                    class="link"
                    id="github"
                    style="margin-left: 4px"
                    target="_blank"
                  >
                    <i class="fa-brands fa-github"></i>
                  </a>
                  <a id="link-text" href="mailto:email@example.com">通过这里联系我</a>
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
                      @click="getHitokoto"
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
              <span class="line-text">网站列表</span>
              <i class="fa-solid fa-angle-right"></i>
            </div>
            <!-- Replicating links for mobile/more view if needed, or simplified -->
            <div class="row" v-for="k in 2" :key="k">
              <div class="col" v-for="j in 3" :key="j">
                <a :href="config[`link_${(k - 1) * 3 + j}`][0]" target="_blank">
                  <div class="link-card cards">
                    <span class="link-name">{{
                      config[`link_${(k - 1) * 3 + j}`][2]
                    }}</span>
                  </div>
                </a>
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
                    <div class="img-title">
                        <span class="img-title-big" id="logo-title-other">{{ config.logo_text_1 }}</span>
                        <span class="img-text" id="logo-title-other-small">.{{ config.logo_text_2 }}</span><br/>
                        <span class="img-text">&nbsp;v&nbsp;2.0</span>
                        <a :href="'https://github.com/' + config.github" target="_blank">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </div>
                    <!--更多内容-->
                    <div class="accordion" id="accordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="true"
                                        aria-controls="collapseOne">
                                    壁纸设置
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show"
                                    aria-labelledby="headingOne" data-bs-parent="#accordion">
                                <div class="accordion-body">
                                    <div class="set">
                                        <div class="wallpaper" id="wallpaper">
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
                        <!--更新日志-->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo">
                                    更新日志
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse"
                                    aria-labelledby="headingTwo" data-bs-parent="#accordion">
                                <div class="accordion-body">
                                    <div class="upnote">
                                        <span class="uptext"><i class="fa-solid fa-circle-plus"></i>&nbsp;Vue 3 重构</span>
                                        <span class="uptext"><i class="fa-solid fa-circle-plus"></i>&nbsp;音乐歌单自定义</span>
                                        <span class="uptext"><i class="fa-solid fa-circle-plus"></i>&nbsp;壁纸个性化</span>
                                    </div>
                                </div>
                            </div>
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

    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import iziToast from "izitoast";
import MusicPlayer from "./components/MusicPlayer.vue";
import configData from "./setting.json";

// Config & State
const config = reactive(configData);
const isLoading = ref(true);
const loadingText = ref("加载中");
const showMore = ref(false);
const showBox = ref(false);
const showMusic = ref(false);
const isHitokotoHover = ref(false);
const wallpaperType = ref("1");
const aplayerContainer = ref(null);
const playingLrc = ref(false);
const currentLrc = ref("");
const musicProgress = ref(0);
const isSeeking = ref(false);
const musicPlayerRef = ref(null);

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
const bgUrl = ref(""); 
const pointer2 = ref(null);

const resolveAsset = (path) => {
  if (path && path.startsWith("./assets")) {
    return new URL(path, import.meta.url).href;
  }
  return path;
};

// Weather
const weather = reactive({
  city: "天气",
  text: "加载失败",
  temp: "",
  windDir: "次数",
  windScale: "超限",
});

// Hitokoto
const hitokoto = reactive({
  text: "每一个人都应该明确自己的方向和位置",
  from: "Freakk",
});

// Time
const timeData = reactive({
  year: 0,
  month: 0,
  day: 0,
  weekday: "星期一",
  timeText: "00:00:00",
});

// Capsule
const capsule = reactive({
    dayPass: 0,
    dayPercent: 0,
    weekDay: 0,
    weekPercent: 0,
    monthDay: 0,
    monthPercent: 0,
    yearMonth: 0,
    yearPercent: 0
})

const switchMore = () => {
    // Legacy function placeholder, replaced by handleSwitchMore
}
// Add reactive state for the message card
const messageTitle = ref("Hello&nbsp;World&nbsp;!");
const messageText = ref("一个建立于 21 世纪的小站，存活于互联网的边缘");

// Update switchMore to toggle text
const handleSwitchMore = () => {
    showMore.value = !showMore.value;
    if (showMore.value) {
        messageTitle.value = "Oops&nbsp;!";
        messageText.value = "哎呀，这都被你发现了（ 再点击一次可关闭 ）";
    } else {
        messageTitle.value = "Hello&nbsp;World&nbsp;!";
        messageText.value = "一个建立于 21 世纪的小站，存活于互联网的边缘";
    }
}

const nextLrc = ref("");

// Methods
const handleBgError = (e) => {
    e.target.classList.add('error');
};

const getHitokoto = () => {
  fetch("https://v1.hitokoto.cn?max_length=24")
    .then((res) => res.json())
    .then((data) => {
      hitokoto.text = data.hitokoto;
      hitokoto.from = data.from;
    })
    .catch(console.error);
};

const updateTime = () => {
    const dt = new Date();
    timeData.year = dt.getFullYear();
    timeData.month = dt.getMonth() + 1;
    timeData.day = dt.getDate();
    const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    timeData.weekday = weeks[dt.getDay()];
    
    const h = dt.getHours().toString().padStart(2, '0');
    const m = dt.getMinutes().toString().padStart(2, '0');
    const s = dt.getSeconds().toString().padStart(2, '0');
    timeData.timeText = `${h}:${m}:${s}`;
}

const updateWeather = (showToast = false) => {
    // iziToast default settings (top center)
    iziToast.settings({
        timeout: 3000, 
        progressBar: false, // Hide progress bar
        position: 'topCenter',
        transitionIn: 'fadeInDown',
    });

    // Hardcoded keys from original
  const add_id = "vcpmlmqiqnjpxwq1";
  const app_secret = "PeYnsesgkmK7qREhIFppIcsoN0ZShv3c";
  const key = "691d007d585841c09e9b41e79853ecc2";
  
  fetch(`https://www.mxnzp.com/api/ip/self?app_id=${add_id}&app_secret=${app_secret}`)
    .then(res => res.json())
    .then(data => {
        if(data.data && data.data.city) {
            let str = data.data.city;
            let city = str.replace(/市/g, "");
            weather.city = city;
            
             fetch(`https://geoapi.qweather.com/v2/city/lookup?location=${city}&number=1&key=${key}`)
                .then(res => res.json())
                .then(location => {
                    if(location.location && location.location.length > 0) {
                        let id = location.location[0].id;
                        fetch(`https://devapi.qweather.com/v7/weather/now?location=${id}&key=${key}`)
                            .then(res => res.json())
                            .then(wData => {
                                if(wData.now) {
                                    weather.text = wData.now.text;
                                    weather.temp = wData.now.temp;
                                    weather.windDir = wData.now.windDir;
                                    weather.windScale = wData.now.windScale;
                                    
                                    if(showToast) {
                                        iziToast.show({
                                            timeout: 2000,
                                            icon: "fa-solid fa-cloud-sun",
                                            message: '实时天气已更新'
                                        });
                                    }
                                }
                            })
                    }
                })
        }
    })
    .catch(console.error);
};


const updateCapsule = () => {
    // Logic from time.js
    let nowDate = +new Date();
    let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
    let todayPassHours = (nowDate - todayStartDate) / 1000 / 60 / 60;
    let todayPassHoursPercent = (todayPassHours / 24) * 100;
    
    capsule.dayPass = parseInt(todayPassHours);
    capsule.dayPercent = parseInt(todayPassHoursPercent);
    
    let weeks = { 0: 7, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };
    let weekDay = weeks[new Date().getDay()];
    let weekDayPassPercent = (weekDay / 7) * 100;
    capsule.weekDay = weekDay;
    capsule.weekPercent = parseInt(weekDayPassPercent);
    
    let year = new Date().getFullYear();
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let monthAll = new Date(year, month, 0).getDate();
    let monthPassPercent = (date / monthAll) * 100;
    
    capsule.monthDay = date;
    capsule.monthPercent = parseInt(monthPassPercent);
    
    let yearPass = (month / 12) * 100;
    capsule.yearMonth = month;
    capsule.yearPercent = parseInt(yearPass);
}

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

    // Current lrc and next lrc
    currentLrc.value = `<span class='lrc-show'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg>&nbsp;${lrc}&nbsp;<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg></span>`;
    
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
             if(oldB.text === lrc) {
                 newItemB = oldB;
             }
        }
        
        if(!newItemB) {
            // First run or jump
             messageList.value = [
                 { text: lrc, id: msgCounter++ },
                 { text: next, id: msgCounter++ }
             ];
        } else {
             // Shift
             messageList.value = [
                 newItemB,
                 { text: next, id: msgCounter++ }
             ];
        }
    }
}


// We need to ensure that when music plays, playingLrc is true
// This is handled by handlePlay event
const handlePlay = () => {
    playingLrc.value = true;
}
const handlePause = () => {
    playingLrc.value = false;
    // Clear message list to show default text
    messageList.value = [];
    // Restore Hello World
    messageTitle.value = "Hello&nbsp;World&nbsp;!";
    messageText.value = "一个建立于 21 世纪的小站，存活于互联网的边缘";
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
import { watch } from 'vue';
watch(wallpaperType, (newVal) => {
    setBg(newVal);
});

let timeInterval;
let capsuleInterval;

onMounted(() => {
  // Init Wallpaper
  const savedType = localStorage.getItem('wallpaperType') || '1';
  setBg(savedType);

  // Mouse Pointer Logic
  const body = document.querySelector("body");
  const p2 = pointer2.value;
  if(p2) {
      body.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            // pointer2 width is 18px (from css) -> half is 9
             p2.style.transform = `translate(${e.clientX - 9}px, ${e.clientY - 9}px)`;
        });
      });
      // Hide on mobile
      if (/AppWebKit.*Mobile.*/.test(window.navigator.userAgent)) {
         p2.style.display = 'none';
      }
  }

  // Init
  getHitokoto();
  updateWeather(); // Initial fetch
  
  // Timers
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
  
  updateCapsule();
  capsuleInterval = setInterval(updateCapsule, 1000);

  // Loading Fake Delay
  setTimeout(() => {
    isLoading.value = false;
    setTimeout(() => {
        iziToast.show({
            timeout: 2500,
            icon: false,
            title: "Hello",
            message: '欢迎来到我的主页'
        });
    }, 800)
  }, 800);
  
  setTimeout(() => {
      loadingText.value = "字体及文件加载可能需要一定时间";
  }, 3000);
});

onUnmounted(() => {
    clearInterval(timeInterval);
    clearInterval(capsuleInterval);
})
</script>

<style>
/* Add transition for showing/hiding more */
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
