<template>
  <div v-if="show" class="about-me-overlay" @click.self="close">
    <div class="about-me-container">
      <!-- Close button -->
      <div class="about-me-close" @click="close">
        <i class="fa-solid fa-circle-xmark"></i>
      </div>

      <!-- Header -->
      <div class="about-me-header">
        <h2>
          <i class="fa-brands fa-github"></i>
          About Me
        </h2>
      </div>

      <!-- Content -->
      <div class="about-me-content">
        <div v-if="loading" class="about-me-loading">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <p>加载中...</p>
        </div>

        <div v-else-if="error" class="about-me-error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>{{ error }}</p>
        </div>

        <div
          v-else
          class="markdown-body"
          v-html="renderedContent"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  readmeUrl: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);

const loading = ref(false);
const error = ref('');
const renderedContent = ref('');

const fetchReadme = async () => {
  if (!props.readmeUrl) {
    error.value = '未配置 README URL';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await fetch(props.readmeUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdown = await response.text();

    // Configure marked options
    marked.setOptions({
      breaks: true, // Convert \n to <br>
      gfm: true, // GitHub Flavored Markdown
      headerIds: true,
      mangle: false // Prevent email obfuscation
    });

    // Parse markdown
    const html = marked.parse(markdown);

    // Sanitize HTML to prevent XSS
    renderedContent.value = DOMPurify.sanitize(html);
  } catch (err) {
    console.error('Failed to fetch README:', err);
    error.value = '加载失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

const close = () => {
  emit('close');
};

// Fetch README when component is shown
watch(() => props.show, (newVal) => {
  if (newVal && props.readmeUrl) {
    fetchReadme();
  }
});

// Also fetch on mount if initially shown
onMounted(() => {
  if (props.show && props.readmeUrl) {
    fetchReadme();
  }
});
</script>

<style scoped>
.about-me-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.about-me-container {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  max-width: 900px;
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
  position: relative;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.about-me-close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.about-me-close:hover {
  color: #fff;
  transform: rotate(90deg);
}

.about-me-header {
  padding: 30px 40px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.about-me-header h2 {
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

.about-me-header i {
  font-size: 1.8rem;
}

.about-me-content {
  padding: 30px 40px;
  overflow-y: auto;
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
}

.about-me-loading,
.about-me-error {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.8);
}

.about-me-loading i,
.about-me-error i {
  font-size: 3rem;
  margin-bottom: 20px;
}

.about-me-loading p,
.about-me-error p {
  font-size: 1.1rem;
  margin: 0;
}

/* Markdown content styling */
.markdown-body {
  line-height: 1.8;
  font-size: 1rem;
}

.markdown-body :deep(h1) {
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.markdown-body :deep(h2) {
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.markdown-body :deep(h3) {
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
}

.markdown-body :deep(p) {
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.markdown-body :deep(a) {
  color: #4dabf7;
  text-decoration: none;
  transition: all 0.2s ease;
}

.markdown-body :deep(a:hover) {
  color: #74c0fc;
  text-decoration: underline;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-body :deep(li) {
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.markdown-body :deep(code) {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
}

.markdown-body :deep(pre) {
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid rgba(255, 255, 255, 0.3);
  padding-left: 1rem;
  margin-left: 0;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}

.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  text-align: left;
}

.markdown-body :deep(th) {
  background: rgba(255, 255, 255, 0.1);
  font-weight: 600;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin: 2rem 0;
}

/* Scrollbar styling */
.about-me-content::-webkit-scrollbar {
  width: 8px;
}

.about-me-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.about-me-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.about-me-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive design */
@media (max-width: 768px) {
  .about-me-container {
    max-height: 90vh;
    margin: 10px;
  }

  .about-me-header {
    padding: 20px;
  }

  .about-me-header h2 {
    font-size: 1.5rem;
  }

  .about-me-content {
    padding: 20px;
  }

  .about-me-close {
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
  }

  .markdown-body :deep(h1) {
    font-size: 1.8rem;
  }

  .markdown-body :deep(h2) {
    font-size: 1.5rem;
  }

  .markdown-body :deep(h3) {
    font-size: 1.2rem;
  }
}
</style>
