import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import GStore from './stores'

createApp(App)
  .use(createPinia())
  .use(router)
  .provide('GStore', GStore)
  .mount('#app')
