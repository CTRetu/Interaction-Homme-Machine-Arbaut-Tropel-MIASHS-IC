import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import HighchartsVue from "highcharts-vue";

import './assets/style.css'

createApp(App).use(router, HighchartsVue).mount('#app')
