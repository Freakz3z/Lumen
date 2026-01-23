<template>
  <div class="music" v-show="show">
    <div class="music-all" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <div class="music-button">
        <div id="music-open" @click="openList">{{ t('music_list') }}</div>
        <div id="music-close" @click="$emit('close')">{{ t('back_hitokoto') }}</div>
      </div>
      <div class="music-control">
        <i class="fa-solid fa-backward-step" id="last" @click="skipBack"></i>
        <div id="play" @click="toggle">
          <i class="fa-solid" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
        </div>
        <i class="fa-solid fa-forward-step" id="next" @click="skipForward"></i>
      </div>
      <div class="music-menu">
        <div class="music-text" v-show="!isHovering">
          <span id="music-name">{{ currentMusicName }}</span>
        </div>
        <div class="music-volume" v-show="isHovering" style="display: flex">
          <div id="volume-ico">
            <i class="fa-solid" :class="volumeIcon"></i>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="volume"
            @input="updateVolume"
          />
        </div>
      </div>
    </div>
    <!-- APlayer Container (Hidden or Positioned) -->
    <div id="aplayer" ref="aplayerRef" class="aplayer-hide"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import APlayer from "aplayer";
import iziToast from "izitoast";
import config from "../../setting.json";

const { t } = useI18n();

const props = defineProps({
  show: Boolean,
  targetContainer: Object // Element ref
});
const emit = defineEmits(["close", "open-box", "update-lyrics", "play", "pause", "update-progress", "load-lrc", "time-update"]);

const isPlaying = ref(false);
const currentMusicName = ref(t('music_loading'));
const isHovering = ref(false);
const volume = ref(Number(localStorage.getItem('music_volume')) || 0.5);
const ap = ref(null);
const aplayerRef = ref(null);

watch(volume, (val) => {
    localStorage.setItem('music_volume', val);
});


const parseLrc = (lrc) => {
    if (!lrc) return [];
    const lines = lrc.split('\n');
    const result = [];
    const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
    for (let line of lines) {
        const match = timeReg.exec(line);
        if (match) {
            const min = parseInt(match[1]);
            const sec = parseInt(match[2]);
            const ms = parseInt(match[3]);
            const s = min * 60 + sec + (ms / (match[3].length === 3 ? 1000 : 100));
            const text = line.replace(/\[.*?\]/g, '').trim();
            if (text) {
                result.push({ time: s, text });
            }
        }
    }
    return result;
};

const volumeIcon = computed(() => {
  if (volume.value == 0) return "fa-volume-xmark";
  if (volume.value <= 0.3) return "fa-volume-off";
  if (volume.value <= 0.6) return "fa-volume-low";
  return "fa-volume-high";
});

// Config from setting.json
const server = config.music_server || "netease";
const type = config.music_type || "playlist";
const id = config.music_id || "3778678";
const api = config.music_api || "https://api.injahow.cn/meting/";

const openList = () => {
    emit('open-box');
};

const toggle = () => ap.value && ap.value.toggle();
const skipBack = () => ap.value && ap.value.skipBack();
const skipForward = () => ap.value && ap.value.skipForward();
const updateVolume = () => ap.value && ap.value.volume(volume.value, true);

onMounted(() => {
  fetch(`${api}?server=${server}&type=${type}&id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      // Use passed container if available, else local ref
      const container = props.targetContainer || aplayerRef.value;
      
      ap.value = new APlayer({
        container: container,
        order: "random",
        preload: "auto",
        listMaxHeight: "336px",
        volume: volume.value,
        mutex: true,
        lrcType: 3,
        audio: data,
        fixed: false, // Ensure it fits in the box
        theme: '#efefef'
      });

      ap.value.on("play", () => {
        isPlaying.value = true;
        try {
            const index = ap.value.list.index;
            const item = ap.value.list.audios[index];
            currentMusicName.value = `${item.name} - ${item.artist}`;
            
            // Emit Lyrics List
            const lrc = item.lrc;
            // Check if lrc is a URL (Meting usually returns URL) or raw text
            if (lrc && !lrc.startsWith('[') && (lrc.startsWith('http') || lrc.startsWith('/'))) {
                 fetch(lrc)
                    .then(r => r.text())
                    .then(text => {
                        const parsed = parseLrc(text);
                        emit('load-lrc', parsed);
                    })
                    .catch(() => emit('load-lrc', []));
            } else {
                // Assume it's raw text or empty
                const parsed = parseLrc(lrc);
                emit('load-lrc', parsed);
            }
        } catch (e) {
            currentMusicName.value = t('music_loading');
        }
        emit('play');
      });
      
      ap.value.on("pause", () => {
        isPlaying.value = false;
        emit('pause');
      });
      
      ap.value.on("listswitch", () => {
          // Update title immediately on switch
           try {
            const index = ap.value.list.index;
            const item = ap.value.list.audios[index];
            currentMusicName.value = `${item.name} - ${item.artist}`;
             // Emit Lyrics List
            const lrc = item.lrc;
            if (lrc && !lrc.startsWith('[') && (lrc.startsWith('http') || lrc.startsWith('/'))) {
                 fetch(lrc)
                    .then(r => r.text())
                    .then(text => {
                         const parsed = parseLrc(text);
                         emit('load-lrc', parsed);
                    })
                    .catch(() => emit('load-lrc', []));
            } else {
                 const parsed = parseLrc(lrc);
                 emit('load-lrc', parsed);
            }
           } catch(e) {
               console.error(e);
           }
      });

      ap.value.on("error", () => {
          console.error("APlayer error");
          currentMusicName.value = t('music_fail');
      });

      // Lyrics sync
      ap.value.on("timeupdate", () => {
          // Progress
          if (ap.value && ap.value.audio.duration) {
              const current = ap.value.audio.currentTime;
              const pct = (current / ap.value.audio.duration) * 100;
              emit('update-progress', pct);
              emit('time-update', current);
          }
          
          if (container) {
              const currentLrc = container.querySelector('.aplayer-lrc-current');
              
               if (currentLrc) {
                   const nextLrcEl = currentLrc.nextElementSibling;
                   const nextText = nextLrcEl ? nextLrcEl.innerText : "PLAYING...";
                   
                   emit('update-lyrics', currentLrc.innerText.trim(), nextText.trim());
              }
          }
      });
      
      // Initial volume
      ap.value.volume(volume.value, true);
    })
    .catch(err => {
        console.error("Music load failed", err);
        iziToast.show({
            timeout: 2000,
            icon: "fa-solid fa-circle-exclamation",
            message: t('music_load_fail')
        });
    });
});

const seek = (pct) => {
    if(ap.value && ap.value.audio.duration) {
        ap.value.seek(ap.value.audio.duration * (pct / 100));
    }
}

defineExpose({ seek });
</script>

<style scoped>
/* 
  Inherit styles from global css, 
  but Ensure APlayer is hidden if we want custom UI only.
  However, the "List" button implies we want to show the list.
  Usually APlayer list is attached to the container.
*/
.aplayer-hide {
    /* We might want to position this absolute or fixed if it's just for the list */
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
}
</style>
