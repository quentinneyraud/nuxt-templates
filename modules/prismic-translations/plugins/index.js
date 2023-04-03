/* eslint-disable no-console */
import '../middlewares/index'
import Vue from 'vue'
import { getTranslations } from '../utils/api'

// eslint-disable-next-line quotes
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

const prismicTranslations = new Vue({
  data () {
    return {
      translations: [],
      locale: null
    }
  },

  computed: {
    currentTranslations () {
      return this.translations.find(translation => translation.locale === this.locale)
    }
  },

  async created () {
    if (!options.translations) {
      this.translations = await getTranslations({
        endpoint: options.endpoint,
        customTypeId: options.customTypeId
      })
    } else {
      this.translations = options.translations
    }
  },

  methods: {
    setLocale (locale) {
      this.locale = locale
    },

    getTranslation (key, { defaultText = key, variables = {} } = {}) {
      let translation = this.currentTranslations?.translations?.[key]

      if (!translation) {
        options.warnMissingKey && console.warn(`[${options.MODULE_NAME}] Cannot find key ${key}`)

        translation = defaultText
      }

      if (variables) {
        Object.entries(variables)
          .forEach(([key, value]) => {
            translation = translation
              .replace(new RegExp(`{${key}}`, 'gi'), value)
          })
      }

      return translation
    }
  }
})

/**
 *
 * Inject
 *
 */
export default (ctx, inject) => {
  inject('prismicTranslations', prismicTranslations)
  inject('pt', prismicTranslations.getTranslation)

  if (ctx.app.i18n) {
    prismicTranslations.setLocale(ctx.app.i18n.localeProperties.prismicCode)

    ctx.app.i18n.onLanguageSwitched = _ => {
      prismicTranslations.setLocale(ctx.app.i18n.localeProperties.prismicCode)
    }
  }
}
