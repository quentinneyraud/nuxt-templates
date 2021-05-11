/* eslint-disable no-console */
import path from 'path'

const MODULE_NAME = 'prismic-translations'

const DEFAULT_OPTIONS = {
  debug: true,
  endpoint: null,
  customTypeId: 'translations'
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
  // Check @prismicio/client exists
  if (!isModuleInstalled('@prismicio/client')) {
    console.error(`❌ [${MODULE_NAME}]: Module @prismicio/client not found`)

    return
  }

  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options[MODULE_NAME],
    ...this.options.prismicTranslations,
    ...moduleOptions,
    MODULE_NAME
  }

  // No endpoint, try to get it from @nuxtjs/prismic module options
  if (!options.endpoint) {
    options.endpoint = this.options.prismic && this.options.prismic.endpoint

    if (!options.endpoint) {
      console.error(`❌ [${MODULE_NAME}]: Cannot find Prismic endpoint in 'prismic' options or 'prismicTranslations' options`)

      return
    }
  }

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })
}
