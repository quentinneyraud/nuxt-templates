module.exports = ({ title, BASE_URL, IS_PREPROD }) => ({
  modules: [
    '~/modules/metas'
  ],

  publicRuntimeConfig: {
    BASE_URL
  },

  metas: {
    title,
    description: 'My description',
    image: '/share.jpg',
    type: 'Website',
    siteName: title,
    noIndex: IS_PREPROD
  }
})
