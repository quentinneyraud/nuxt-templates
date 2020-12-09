import path from 'path'

const MODULE_NAME = 'debug'

const DEFAULT_OPTIONS = {
  debug: false,
  force: false
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
  let options = this.options.debug || moduleOptions || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    MODULE_NAME
  }

  const isDev = this.options.dev

  if (!isDev && !options.force) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join(MODULE_NAME, 'plugin.js'),
    options,
    ssr: true
  })

  // Utils
  this.addTemplate({
    src: path.resolve(__dirname, 'templates/Debug.vue'),
    fileName: path.join(MODULE_NAME, 'Debug.vue'),
    options
  })
}
