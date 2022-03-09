module.exports = _ => ({
  modules: [
    '~/modules/prismic-translations'
  ],
  prismicTranslations: {
    /**
      console.warn if key is missing (Default: true in dev mode)
     */
    warnMissingKey: undefined,

    /**
      Prismic endpoint (Default: endpoint value in @nuxtjs/prismic module config)
     */
    prismicEndpoint: undefined,

    /**
      Prismic custom type ID to get translations from (Default: 'translations')
     */
    customTypeId: 'translations'
  }
})
