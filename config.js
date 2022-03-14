module.exports = ({ BASE_URL } = {}) => ({
  modules: [
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: BASE_URL
  }
})
