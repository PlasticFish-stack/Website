import { createApp } from 'vue'
import i18n from '@/lang/index.js'
import './style.css'
import 'reset-css'
import 'animate.css'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).use(i18n).mount('#app')