module.exports = ({ lang, title, description, shareImage, BASE_URL, IS_PROD }) => ({
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
    siteName: null, // Default to title
    twitterUser: null,
    noIndex: !IS_PROD
  }
})
