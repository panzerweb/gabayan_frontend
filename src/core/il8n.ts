// src/i18n.ts
import { createI18n } from 'vue-i18n'
import en from '../shared/locales/en.json'
import tl from '../shared/locales/tl.json'

// 1. Define the type of your messages schema
type MessageSchema = typeof en

// 2. Define the supported locales
type SupportedLocales = 'en' | 'tl'

const savedLocale = (localStorage.getItem('user-locale') as SupportedLocales) || 'en'

const i18n = createI18n<[MessageSchema], SupportedLocales>({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    tl
  }
})

export default i18n
