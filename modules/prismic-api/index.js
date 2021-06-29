import path from 'path'
const fs = require('fs').promises

const MODULE_NAME = 'prismic-api'
const DEFAULT_OPTIONS = {
  debug: false,
  apiFolder: 'api',
  files: []
}

const snakeToCamel = str => str.replace(
  /([-_][a-z])/g,
  group => group.toUpperCase()
    .replace('-', '')
    .replace('_', '')
)

export default async function (moduleOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options[MODULE_NAME],
    ...this.options.prismicApi,
    ...moduleOptions,
    MODULE_NAME
  }

  // this.options.watch.push(options.apiFolder)

  try {
    const files = await fs.readdir(path.resolve(options.apiFolder))
    for (const file of files) {
      const a = path.parse(file)

      options.files.push({
        method: snakeToCamel(a.name),
        path: './routes/' + a.base
      })

      this.addTemplate({
        src: path.resolve(options.apiFolder, a.base),
        fileName: path.join(MODULE_NAME, 'routes', a.base),
        options
      })
    }
  } catch (err) {
    console.error(err)
  }

  // Plugins
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'index.js'),
    options,
    ssr: true
  })

  // Helpers
  this.addTemplate({
    src: path.resolve(__dirname, 'utils/Formatter.js'),
    fileName: path.join(MODULE_NAME, 'utils/Formatter.js'),
    options
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'utils/helpers.js'),
    fileName: path.join(MODULE_NAME, 'utils/helpers.js'),
    options
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'utils/prismic.js'),
    fileName: path.join(MODULE_NAME, 'utils/prismic.js'),
    options
  })
  /**
   *
   * Templates
   *
   */
  // this.addTemplate({
  //   src: path.resolve(__dirname, 'components/VirtualScrollScrollBar.vue'),
  //   fileName: path.join(MODULE_NAME, 'components/VirtualScrollScrollBar.vue'),
  //   options
  // })
}
