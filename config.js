module.exports = ({ title = 'My company', description = 'My company is doing something', lang = 'en', themeColor = '#FFFFFF' }) => ({
  modules: ['@nuxtjs/pwa'],

  pwa: {
    // https://pwa.nuxtjs.org/icon/
    icon: {
      plugin: false
    },
    // https://pwa.nuxtjs.org/manifest
    manifest: {
      name: title,
      short_name: title,
      lang,
      description,
      background_color: themeColor,
      theme_color: themeColor
    }
  }
})
