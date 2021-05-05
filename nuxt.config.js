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
    '~/modules/signature'
  ],
  build: {},
  /**
   * Signature module
   */
  signature: {
    force: true,
    name: 'Akaru Studio',
    website: 'https://twitter.com/Akaru_studio',
    facebook: 'https://twitter.com/Akaru_studio',
    twitter: 'https://twitter.com/Akaru_studio',
    team: [{
      name: 'Quentin Neyraud',
      status: 'Developer',
      github: 'https://www.github.com/quentinneyraud',
      twitter: 'https://www.twitter.com/quentin_neyraud'
    }],
    libraries: [{
      name: 'GSAP',
      author: 'Greensock',
      website: 'https://greensock.com/gsap'
    }, {
      name: 'Nuxt.js',
      author: 'Nuxt',
      website: 'https://nuxtjs.org'
    }],
    fonts: [{
      name: 'Comic Sans',
      author: 'Vincent Connare',
      website: 'http://www.connare.com/'
    }],
    icons: [{
      name: 'Menu',
      author: 'Tara Nadhifa Salsabila',
      website: 'https://thenounproject.com/taraicon/'
    }]
  }
}
