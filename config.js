module.exports = ({ IS_DEV, IS_PREPROD }) => ({
  buildModules: ['@nuxtjs/prismic'],

  modules: ['~/modules/prismic'],

  prismic: {
    endpoint: 'https://my-site.cdn.prismic.io/api/v2',
    modern: !IS_DEV,
    preview: IS_PREPROD ? '/preview/' : false,
    apiOptions: {
      routes: [
        {
          type: 'home_page',
          path: '/'
        },
        {
          type: 'project',
          path: '/projects/:uid/'
        }
      ]
    }

  }
})
