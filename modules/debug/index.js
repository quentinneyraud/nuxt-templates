/* eslint-disable no-console */
import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'debug'

const DEFAULT_OPTIONS = {
  force: false
}

export default function (moduleOptions) {
  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], DEFAULT_OPTIONS),
    MODULE_NAME
  }

  if (!this.options.dev && !options.force) {
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  // Component
  this.addPlugin({
    src: path.resolve(__dirname, 'components/index.js'),
    fileName: path.join(MODULE_NAME, 'components/plugin.js'),
    options,
    ssr: true
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'components/Debug.vue'),
    fileName: path.join(MODULE_NAME, 'components/Debug.vue'),
    options
  })
}
