module.exports = {
  metas: {
    title: 'Eslint',
    description: 'Add eslint config',
    category: 'Development helpers'
  },
  dependencies: [],
  devDependencies: [
    '@babel/eslint-parser'
  ],
  files: [
    '.eslintrc.js'
  ],
  installCommands: [
    'npx install-peerdeps @qneyraud/eslint-config --dev'
  ],
  postInstall: Log => {
    Log.info('Add these lines to package.json scripts :')

    Log.log(`
"lint:js": "eslint --ext \\".js,.vue\\" --ignore-path .gitignore .",
"lint": "yarn lint:js",
"lintfix": "yarn lint:js --fix"`)
  }
}
