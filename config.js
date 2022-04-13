module.exports = ({ ENVIRONMENT, IS_DEV, IS_PREPROD, IS_PROD, MODE, BASE_URL }) => ({
  // Modern build
  modern: IS_PROD ? 'client' : false,

  // Access on local network
  server: {
    host: '0.0.0.0'
  },

  // Global register without directory prefix
  components: [{
    path: '~/components',
    pathPrefix: false
  }],

  // Provide constants to app
  publicRuntimeConfig: {
    ENVIRONMENT,
    IS_DEV,
    IS_PREPROD,
    IS_PROD,
    MODE,
    BASE_URL
  }
})
