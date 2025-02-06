import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { router } from './config/router'
import { pinia } from './config/pinia';
import Vue3Lottie from 'vue3-lottie'
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import './style.scss'
import App from './App.vue'

createApp(App)
    .use(pinia)
    .use(router)
    .use(Vue3Lottie)
    .use(PrimeVue, {
        ripple: true,
        theme: {
            preset: Aura
        }
    })
    .mount('#app')
