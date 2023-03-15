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
  ],
  postInstall: Log => {
    Log.info('Add this line to package.json scripts :')

    Log.blankLine()

    Log.log('"optimize-icons": "svgo -f assets/svg --exclude \\".*_clean.svg\\""')
  }
}
