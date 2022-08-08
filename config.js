module.exports = ({ MODE }) => MODE === 'spa'
  ? ({
    ssr: false,

    generate: {
      fallback: true
    }

    // Uncomment and install this package to run nuxtServerInit on client side
    // https://www.npmjs.com/package/nuxt-client-init-module

    // modules: [
    //   'nuxt-client-init-module'
    // ]
  })
  : ({})
