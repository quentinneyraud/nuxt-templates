module.exports = ({ IS_PROD }) => ({
  publicRuntimeConfig: {
    IS_PROD
  },

  plugins: [
    '~/plugins/api'
  ]
})
