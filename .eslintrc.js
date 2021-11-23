module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    '@qneyraud/eslint-config/nuxt'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    indent: ['error', 2, {
      SwitchCase: 1
    }]
  }
}
