import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'pixel-perfect'

const DEFAULT_OPTIONS = {
  force: false,
  images: [],
  directory: 'pixel-perfect',
  changeOnNavigation: false
}

export default function (moduleOptions) {
  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], this.options.pixelPerfect, DEFAULT_OPTIONS),
    MODULE_NAME
  }

  if (!this.options.dev && !options.force) {
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  options.changeOnNavigation = options.images.some(image => Object.prototype.hasOwnProperty.call(image, 'route'))
  options.images = options.images.map(image => typeof image === 'string' ? { src: image } : image)

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
