module.exports = ({ IS_DEV, IS_PROD }) => ({
  publicRuntimeConfig: {
    IS_DEV,
    IS_PROD,
    LOCALE: process.env.PRISMIC_LOCALE || 'fr-fr'
  },

  plugins: ['~/plugins/api']
})
