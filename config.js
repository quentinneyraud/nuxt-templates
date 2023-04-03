module.exports = ({ IS_INDEXED }) => ({
  modules: ['@nuxtjs/robots'],

  robots: _ => {
    return IS_INDEXED
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
