import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'izitoast/dist/css/iziToast.min.css'
import 'aplayer/dist/APlayer.min.css'

import './assets/css/style.css'
import './assets/css/mobile.css'
import './assets/css/loading.css'
import './assets/css/animation.css'

const app = createApp(App);
app.use(i18n);
app.mount('#app');
