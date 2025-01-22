import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { router } from './config/router'
import { pinia } from './config/pinia';
import Aura from '@primevue/themes/aura';
import './style.scss'
import App from './App.vue'

createApp(App)
    .use(pinia)
    .use(router)
    .use(PrimeVue, {
        ripple: true,
        theme: {
            preset: Aura
        }
    })
    .mount('#app')
