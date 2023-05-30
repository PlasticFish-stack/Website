import CN from "./zh_CN"
import US from "./en_US"
import HK from "./zh_HK"
import { createI18n } from "vue-i18n"
const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh : {
      ...CN
    },
    en : {
      ...US
    },
    hk : {
      ...HK
    }
  }
})
export default i18n