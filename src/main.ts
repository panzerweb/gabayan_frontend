import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'
import i18n from './core/il8n.ts'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(createPinia())

app.mount('#app')
