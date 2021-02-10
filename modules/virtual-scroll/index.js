import path from 'path'

const MODULE_NAME = 'virtual-scroll'
const DEFAULT_OPTIONS = {
  debug: false
}

export default function (moduleOptions) {
  let options = moduleOptions || this.options.virtualScroll || {}

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
    src: path.resolve(__dirname, 'templates/directives/section.js'),
    fileName: path.join(MODULE_NAME, 'directives/section.js'),
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

  /**
   *
   * Components
   *
   */
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/components/plugin.js'),
    fileName: path.join(MODULE_NAME, 'components/plugin.js'),
    options,
    ssr: true
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/components/VirtualScrollScrollBar.vue'),
    fileName: path.join(MODULE_NAME, 'components/VirtualScrollScrollBar.vue'),
    options
  })
}
