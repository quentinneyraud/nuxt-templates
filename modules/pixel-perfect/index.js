/* eslint-disable no-console */
import path from 'path'

const MODULE_NAME = 'pixel-perfect'

const DEFAULT_OPTIONS = {
  force: false
}

export default function (moduleOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options.pixelPerfect,
    ...moduleOptions,
    MODULE_NAME
  }

  if (!this.options.dev && !options.force) {
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  // Component
  this.addPlugin({
    src: path.resolve(__dirname, 'components/index.js'),
    fileName: path.join(MODULE_NAME, 'components/index.js'),
    options,
    ssr: true
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'components/PixelPerfect.vue'),
    fileName: path.join(MODULE_NAME, 'components/PixelPerfect.vue'),
    options
  })
}
