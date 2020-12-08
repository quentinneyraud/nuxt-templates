import path from 'path'

const MODULE_NAME = 'prismic-translations'
const DEFAULT_OPTIONS = {
  debug: true,
  endpoint: null,
  defaultLocale: null,
  customTypeApiID: 'translations',
  groupFieldApiID: 'translations'
}

const isModuleInstalled = moduleName => {
  let path

  try {
    path = require.resolve(moduleName)
  } catch (_) {
    return false
  }

  return path
}

export default function (moduleOptions) {
  // Check prismic-javascript exists
  if (!isModuleInstalled('prismic-javascript')) {
    // eslint-disable-next-line
    console.error(`❌ [${MODULE_NAME}]: Module prismic-javascript not found`)

    return
  }

  /**
   *
   * Create options
   *
   */
  let options = this.options.prismicTranslations || moduleOptions || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    MODULE_NAME
  }

  // No endpoint, try to get it from @nuxtjs/prismic module options
  if (!options.endpoint) {
    options.endpoint = this.options.prismic && this.options.prismic.endpoint

    if (!options.endpoint) {
      // eslint-disable-next-line no-console
      console.error(`❌ [${MODULE_NAME}]: Cannot find Prismic endpoint in 'prismic' options or 'prismicTranslations' options`)

      return
    }
  }

  /**
   *
   * Add templates and plugins
   *
   */

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join(MODULE_NAME, 'plugin.js'),
    options,
    ssr: true
  })

  // Utils
  this.addTemplate({
    src: path.resolve(__dirname, 'templates/utils.js'),
    fileName: path.join(MODULE_NAME, 'utils.js'),
    options
  })
}
