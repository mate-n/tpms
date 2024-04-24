import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Theme
const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#006221',
    background: '#f5f5f5'
  }
}

// Vuetify
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme
    }
  }
})

// Vue I18n
import { createI18n } from 'vue-i18n'
import { englishTranslations } from './translations/en'
const messages = {
  en: englishTranslations
}
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

// AxiosInstanceProvider
import axiosInstanceProvider from './plugins/AxiosInstanceProvider'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(axiosInstanceProvider)
app.mount('#app')
