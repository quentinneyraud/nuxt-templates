module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    '@qneyraud/eslint-config/nuxt'
  ],
  settings: {
    'import/resolver': ['nuxt']
  },
  plugins: [],
  // add your custom rules here
  rules: {}
}
