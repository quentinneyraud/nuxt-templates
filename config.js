module.exports = ({ IS_PROD }) => ({
  modules: [
    '@nuxtjs/robots'
  ],
  robots: _ => {
    return IS_PROD
      ? {
        UserAgent: '*',
        Disallow: ''
      }
      : {
        UserAgent: '*',
        Disallow: '/'
      }
  }
})
