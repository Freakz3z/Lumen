<template>
  <div class="message-board-overlay" v-if="show" @click.self="close">
    <div class="message-board-card">
        <div class="mb-header">
            <h3><i class="fa-solid fa-comments"></i> 留言板</h3>
            <div class="mb-close" @click="close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div class="mb-content">
             <div v-if="!config.repo || !config.repoId" class="mb-warning">
                 <p>请在 setting.json 中配置 Giscus 信息以启用留言板。</p>
                 <a href="https://giscus.app/zh-CN" target="_blank">获取配置</a>
             </div>
             <div v-else class="giscus-container" ref="giscusContainer">
                 <!-- Script will be injected here -->
             </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';

const props = defineProps({
    show: Boolean,
    config: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};

const giscusContainer = ref(null);
const scriptLoaded = ref(false);

const loadGiscus = () => {
    if (!props.config.repo || scriptLoaded.value || !giscusContainer.value) return;
    
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', props.config.repo);
    script.setAttribute('data-repo-id', props.config.repoId);
    script.setAttribute('data-category', props.config.category || 'General');
    script.setAttribute('data-category-id', props.config.categoryId || '');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    giscusContainer.value.appendChild(script);
    scriptLoaded.value = true;
};

watch(() => props.show, (newVal) => {
    if (newVal) {
        nextTick(() => {
            loadGiscus();
        });
    }
});
</script>

<style scoped>
.message-board-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
}

.message-board-card {
    width: 90%;
    max-width: 800px;
    height: 80vh;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

@media (prefers-color-scheme: dark) {
    .message-board-card {
        background: rgba(30, 30, 30, 0.85);
        color: #fff;
    }
}

.mb-header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.mb-close {
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0 0.5rem;
    transition: transform 0.2s;
}

.mb-close:hover {
    transform: scale(1.1);
}

.mb-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

.mb-warning {
    text-align: center;
    padding: 2rem;
    color: #666;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>
