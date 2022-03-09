import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'pixel-perfect'

export default function (moduleOptions) {
  const DEFAULT_OPTIONS = {
    force: false,
    mockups: [],
    directory: 'pixel-perfect',
    changeOnNavigation: true
  }

  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], this.options.pixelPerfect, DEFAULT_OPTIONS),
    MODULE_NAME
  }

  if (!this.options.dev && !options.force) {
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  options.mockups = options.mockups.map(mockup => typeof mockup === 'string' ? { src: mockup } : mockup)

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
