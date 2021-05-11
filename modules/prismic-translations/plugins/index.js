/* eslint-disable no-console */
import Vue from 'vue'
import Prismic from '@prismicio/client'

const options = JSON.parse('<%= JSON.stringify(options) %>')

const prismicTranslations = new Vue({
  fetch () {
    console.log('ok')
  },
  data () {
    return {
      api: null,
      document: null,
      translations: [],
      locale: options.defaultLocale,
      defaultLocale: options.defaultLocale
    }
  },
  computed: {
    currentTranslations () {
      return this.translations
        .find(translation => translation.locale === this.locale)
    },
    defaultTranslations () {
      return this.translations
        .find(translation => translation.locale === this.defaultLocale)
    }
  },
  async created () {
    await this.setApi()
    await this.setDocument()

    if (!this.defaultLocale) this.setDefaultLocale(this.api.languages[0].id)
    if (!this.locale) this.setLocale(this.api.languages[0].id)

    this.translations = this.document.results.map(result => {
      return {
        locale: result.lang,
        translations: result.data.translations[0]
      }
    })
  },
  methods: {
    async setApi () {
      try {
        this.api = await Prismic.getApi(options.endpoint)
      } catch (err) {
        console.error(`❌ [${options.MODULE_NAME}]: Error while trying to get Prismic API`, err)
      }
    },
    async setDocument () {
      try {
        this.document = await this.api.query(
          Prismic.Predicates.at('document.type', 'translations'),
          {
            lang: '*'
          }
        )
      } catch (err) {
        console.error(`❌ [${options.MODULE_NAME}]: Error while getting document, did you create a custom type`, err)
      }
    },
    setLocale (locale) {
      this.locale = locale
    },
    setDefaultLocale (defaultLocale) {
      this.defaultLocale = defaultLocale
    },
    getTranslation (key) {
      return this.currentTranslations?.translations?.[key] || key
    }
  }
})

/**
 *
 * Inject
 *
 */
export default (ctx, inject) => {
  // inject('prismicTranslations', prismicTranslations)
  inject('pt', prismicTranslations.getTranslation)

  console.log(ctx.store)

  ctx.store.registerModule('prismicTranslations', {
    namespaced: true,
    state: _ => ({
      translations: []
    }),
    actions: _ => ({
      setTranslations ({ commit }, translations) {
        commit('setTranslations', translations)
      }
    }),
    mutations: {
      setTranslations (state, translations) {
        state.translations = translations
      }
    }
  })
}
