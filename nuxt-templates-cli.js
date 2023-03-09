module.exports = {
  metas: {
    title: 'SVG',
    description: 'Add SVG component',
    category: 'Components'
  },
  dependencies: [],
  devDependencies: [
    'svgo',
    '@nuxtjs/svg'
  ],
  files: [
    'components/AppSvg.vue',
    'svgo.config.js',
    'modules/svg',
    'assets/svg'
  ]
}
