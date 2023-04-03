import path from 'path'
import defu from 'defu'
import constructMetas from './constructMetas'

const MODULE_NAME = 'metas'

export default function (moduleOptions) {
  const DEFAULT_OPTIONS = {
    BASE_URL: null,
    lang: 'en',
    title: null,
    description: null,
    image: null,
    siteName: null,
    twitterUser: null,
    noIndex: false
  }

  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], DEFAULT_OPTIONS),
    MODULE_NAME
  }

  this.options.alias.hasMetas = path.resolve(__dirname, 'mixins/hasMetas.js')

  this.options.head = defu(this.options.head, constructMetas({
    title: options.title,
    description: options.description,
    url: options.BASE_URL,
    image: (options.BASE_URL && options.image) ? options.BASE_URL + options.image : null
  }))

  this.options.head = defu(this.options.head, {
    htmlAttrs: {
      lang: options.lang
    },
    meta: [
      // Common
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },

      // Type
      { name: 'og:type', property: 'og:type', content: 'Website' },

      // Site name
      { property: 'og:site_name', content: options.siteName || options.title },

      // Twitter specific
      { name: 'twitter:card', content: 'summary_large_image' },
      ...(options.twitterUser ? [{ name: 'twitter:site', content: options.twitterUser }] : []),

      // No index
      ...(options.noIndex ? [{ name: 'robots', content: 'noindex' }] : [])
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  })
}
