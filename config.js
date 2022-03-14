module.exports = ({ IS_PROD } = {}) => ({
  plugins: [
    {
      src: '~/plugins/gsap.js',
      ssr: false
    }
  ],
  publicRuntimeConfig: {
    IS_PROD
  },
  build: {
    transpile: [
      'gsap'
    ]
  }
})
