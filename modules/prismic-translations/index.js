/* eslint-disable no-console */
import path from 'path'
import { getTranslations } from './utils/api'

const MODULE_NAME = 'prismic-translations'

const DEFAULT_OPTIONS = {
  warnMissingKey: false,
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

export default async function (moduleOptions) {
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
    warnMissingKey: this.options.dev && process.env.NODE_ENV === 'development',
    MODULE_NAME
  }

  // No endpoint, try to get it from @nuxtjs/prismic module options
  if (!options.endpoint) options.endpoint = this.options.prismic && this.options.prismic.endpoint

  if (!options.endpoint) {
    console.error(`❌ [${MODULE_NAME}]: Cannot find Prismic endpoint`)

    return
  }

  const extract = !this.options.dev && process.env.NODE_ENV !== 'development' && this.options.ssr === true && this.options.target === 'static'
  let translations = null

  if (extract) {
    translations = await getTranslations({
      endpoint: options.endpoint,
      customTypeId: options.customTypeId
    })
    options.translations = translations
  }

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })

  // Utils
  this.addTemplate({
    src: path.resolve(__dirname, 'utils/api.js'),
    fileName: path.join(MODULE_NAME, 'utils/api.js'),
    options,
    ssr: true
  })

  // Middleware
  this.addTemplate({
    src: path.resolve(__dirname, 'middlewares/index.js'),
    fileName: path.join(MODULE_NAME, 'middlewares/index.js'),
    options
  })

  this.options.router.middleware.push('prismicTranslations')
}
