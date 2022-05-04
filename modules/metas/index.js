import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'metas'

export default function (moduleOptions) {
  const DEFAULT_OPTIONS = {
    BASE_URL: null,
    lang: 'My website',
    title: 'My website',
    description: 'My website description',
    image: null,
    siteName: 'My website',
    noIndex: false
  }

  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], DEFAULT_OPTIONS),
    MODULE_NAME
  }

  this.options.alias.hasMetas = path.resolve(__dirname, 'mixins/hasMetas.js')

  this.options.head = {
    htmlAttrs: {
      lang: options.lang
    },
    title: options.title,
    meta: [
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: options.title },

      { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'Website' },

      { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: options.title },

      { hid: 'description', name: 'description', content: options.description },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: options.description },

      ...(options.BASE_URL && options.image ? [{ hid: 'og:image', name: 'og:image', property: 'og:image', content: options.BASE_URL + options.image }] : []),

      ...(options.noIndex ? [{ name: 'robots', content: 'noindex' }] : [])
    ]
  }
}
