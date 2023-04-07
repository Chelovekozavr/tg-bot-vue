import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { vMaska } from "maska"

loadFonts()

createApp(App)
    .directive("maska", vMaska)
    .use(router)
    .use(vuetify)
    .mount('#app')


