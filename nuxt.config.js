export default {
  target: 'static',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: 'nuxt-templates',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/prismic',
    '~/modules/prismic-translations',
    'nuxt-i18n'
  ],
  build: {},
  /**
   * Prismic module
   */
  prismic: {
    endpoint: 'https://zorbagroup.cdn.prismic.io/api/v2'
  },

  /**
   * I18n module
   */
  i18n: {
    strategy: 'prefix',
    locales: [{
      code: 'en',
      iso: 'en',
      prismicCode: 'en-pa'
    }, {
      code: 'fr',
      iso: 'fr',
      prismicCode: 'fr-pa'
    }],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    }
  }
}
