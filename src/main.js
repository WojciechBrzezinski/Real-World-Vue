import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const GStore = reactive({ flashMessage: '' })

createApp(App)
  .use(createPinia())
  .use(router)
  .provide('GStore', GStore)
  .mount('#app')
