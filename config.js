module.exports = _ => ({
  modules: [
    '~/modules/prismic-translations'
  ],
  prismicTranslations: {
    /**
     * console.warn if key is missing (default to true in dev)
     */
    // warnMissingKey: null,

    /**
     * Prismic endpoint (default to endpoint value in @nuxtjs/prismic module)
     */
    // prismicEndpoint: null,

    /**
     * Prismic custom type ID to get translations from (default to 'translations')
     */
    // customTypeId: 'translations'
  }
})
