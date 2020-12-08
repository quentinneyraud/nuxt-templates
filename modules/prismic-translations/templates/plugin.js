import Vue from 'vue'
import Prismic from 'prismic-javascript'
import { error, infos } from './utils'

const options = JSON.parse('<%= JSON.stringify(options) %>')

const prismicTranslations = new Vue({
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

    infos('Translations')
    if (options.debug) {
      // eslint-disable-next-line no-console
      console.log(this.translations)
    }
  },
  methods: {
    async setApi () {
      try {
        this.api = await Prismic.getApi(options.endpoint)
      } catch (err) {
        error('Error while trying to get Prismic API', err)
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
        error(`Error while getting document, did you create a custom type "${options.customTypeApiID}" with this config: \n\n ${this.getCustomTypeConfig()}`, err)
      }
    },
    getCustomTypeConfig () {
      const config = {
        Main: {
          title: {
            type: 'Text',
            config: {
              label: 'Titre'
            }
          },
          [options.groupFieldApiID]: {
            type: 'Group',
            config: {
              repeat: false,
              fields: {
                button_text: {
                  type: 'Text',
                  config: {
                    label: 'Texte du bouton'
                  }
                }
              },
              label: 'Liste des traductions'
            }
          }
        }
      }

      return JSON.stringify(config, null, 2)
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
export default (_, inject) => {
  // inject('prismicTranslations', prismicTranslations)
  inject('pt', prismicTranslations.getTranslation)
}
