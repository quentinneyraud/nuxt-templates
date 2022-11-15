module.exports = ({ IS_DEV }) => ({
  publicRuntimeConfig: {
    IS_DEV,
    NETLIFY_ENDPOINT: `${IS_DEV ? 'http://localhost:8888' : ''}/.netlify/functions`
  }
})
