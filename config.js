module.exports = ({ title = 'My company', description = 'My company is doing something', lang = 'en', shareImage, BASE_URL, IS_PREPROD }) => ({
  modules: [
    '~/modules/metas'
  ],

  publicRuntimeConfig: {
    BASE_URL
  },

  metas: {
    BASE_URL,
    lang,
    title,
    description,
    image: shareImage,
    siteName: title,
    noIndex: IS_PREPROD
  }
})
