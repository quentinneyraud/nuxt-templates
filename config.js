module.exports = ({ IS_PROD }) => ({
  publicRuntimeCOnfig: {
    IS_PROD
  },

  plugins: [
    '~/plugins/api'
  ]
})
