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
    '~/modules/events'
  ],
  build: {},
  /**
   * Events module
   */
  events: [
    'ticker',
    'resize',
    'visibility',
    'orientation',
    {
      type: 'resize',
      options: {
        name: 'resize:debounced',
        debounce: 300
      }
    }]
}
