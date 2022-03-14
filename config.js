module.exports = ({ BASE_URL } = {}) => ({
  modules: [
    '@nuxtjs/sitemap'
  ],
  // https://sitemap.nuxtjs.org/fr/guide/configuration
  sitemap: {
    hostname: BASE_URL
  }
})
