/* eslint-disable no-console */
import path from 'path'

const MODULE_NAME = 'debug'

const DEFAULT_OPTIONS = {
  force: false
}

export default function (moduleOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options.debug,
    ...moduleOptions,
    MODULE_NAME
  }

  if (!this.options.dev && !options.force) {
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'components/index.js'),
    fileName: path.join(MODULE_NAME, 'plugin.js'),
    options,
    ssr: true
  })

  // Utils
  this.addTemplate({
    src: path.resolve(__dirname, 'components/Debug.vue'),
    fileName: path.join(MODULE_NAME, 'Debug.vue'),
    options
  })
}
