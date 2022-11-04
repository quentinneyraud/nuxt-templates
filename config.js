module.exports = ({ IS_DEV, IS_PROD }) => ({
  publicRuntimeConfig: {
    IS_DEV,
    IS_PROD
  },

  plugins: [
    '~/plugins/api'
  ]
})
