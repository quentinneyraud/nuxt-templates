module.exports = ({ IS_INDEXED }) => {
  let headers = {}
  const redirects = []

  if (!IS_INDEXED) {
    headers = {
      '/*': ['X-Robots-Tag: noindex']
    }
  }

  // redirects = [
  // {
  //   from: '/old-adress',
  //   to: '/new-adress',
  //   status: 301,
  //   force: true
  // }
  // ]

  return {
    buildModules: ['@aceforth/nuxt-netlify'],

    // https://github.com/juliomrqz/nuxt-netlify#usage
    netlify: {
      headers,
      redirects
    }
  }
}
