module.exports = ({ ENVIRONMENT, IS_DEV, IS_PREPROD, IS_PROD, MODE, BASE_URL }) => ({
  // Target
  target: 'static',

  // Modern build
  modern: !IS_DEV ? 'client' : false,

  // Access on local network
  server: {
    host: '0.0.0.0'
  },

  // Global register without directory prefix
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Provide constants to app
  publicRuntimeConfig: {
    ENVIRONMENT,
    IS_DEV,
    IS_PREPROD,
    IS_PROD,
    MODE,
    BASE_URL
  },

  // Extract CSS into files
  build: {
    extractCSS: !IS_DEV
  },

  // Trailing slashes
  router: {
    trailingSlash: true
  }
})
