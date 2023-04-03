module.exports = _ => ({
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  css: ['~/assets/styles/global/index.scss'],

  styleResources: {
    scss: ['~/assets/styles/shared/index.scss']
  },

  build: {
    loaders: {
      scss: {
        // Fix devtools live edit that breaks all styles in page
        sourceMap: false,
        additionalData: "@use 'sass:math';"
      }
    }
  }
})
