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
    '~/modules/pixel-perfect'
  ],
  build: {},

  /**
   *
   * Pixel perfect module
   *
   */
  pixelPerfect: {
    mockups: [
      {
        src: 'page_about.png',
        routeName: 'about'
      },
      {
        src: 'page_contact.png',
        routeName: /^foo(bar)?$/i
      },
      {
        src: 'page_cgv.png',
        routeName: 'index'
      },
      'page_faq.png',
      'page_legals.png',
      'page_manifeste.png',
      'page_press.png'
    ]
  }
}
