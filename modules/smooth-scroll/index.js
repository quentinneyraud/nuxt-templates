import path from 'path'

const MODULE_NAME = 'smooth-scroll'
const DEFAULT_OPTIONS = {
  debug: false
}

export default function (moduleOptions) {
  let options = moduleOptions || this.options.smoothScroll || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    MODULE_NAME
  }

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join(MODULE_NAME, 'plugin.js'),
    options,
    ssr: false
  })

  // Utils
  this.addTemplate({
    src: path.resolve(__dirname, 'templates/utils.js'),
    fileName: path.join(MODULE_NAME, 'utils.js'),
    options
  })

  /**
   *
   * Directives
   *
   */
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/directives/main.js'),
    fileName: path.join(MODULE_NAME, 'directives/main.js'),
    options,
    ssr: false
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/directives/container.js'),
    fileName: path.join(MODULE_NAME, 'directives/container.js'),
    options,
    ssr: false
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/directives/fixed.js'),
    fileName: path.join(MODULE_NAME, 'directives/fixed.js'),
    options,
    ssr: false
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/directives/parallax.js'),
    fileName: path.join(MODULE_NAME, 'directives/parallax.js'),
    options,
    ssr: false
  })
}
