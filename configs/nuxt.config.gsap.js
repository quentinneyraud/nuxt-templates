module.exports = ({ IS_PROD } = {}) => ({
  modules: ['~/modules/gsap'],
  publicRuntimeConfig: {
    IS_PROD
  },
  build: {
    transpile: ['gsap']
  }
})
