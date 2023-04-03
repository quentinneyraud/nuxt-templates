module.exports = ({ MODE }) => ({
  loading: false,

  css: ['~/modules/transitions/assets/index.css'],

  modules: ['~/modules/transitions'],

  publicRuntimeConfig: {
    MODE
  }
})
