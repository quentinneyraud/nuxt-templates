module.exports = ({ BASE_URL } = {}) => ({
  buildModules: [
    '~/modules/sitemap'
  ],
  modules: [
    '@nuxtjs/sitemap'
  ],
  // https://sitemap.nuxtjs.org/fr/guide/configuration
  sitemap: {
    hostname: BASE_URL
  }
})
