module.exports = ({ MODE }) => ({
  // Remove default loading bar
  loading: false,

  modules: [
    '~/modules/transitions'
  ],

  publicRuntimeConfig: {
    MODE
  }
})
