import path from 'path'

const MODULE_NAME = 'rgpd'
const DEFAULT_OPTIONS = {
  debug: true
}

export default function (moduleOptions) {
  /**
   *
   * Create options
   *
   */
  let options = this.options.rgpd || moduleOptions || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    MODULE_NAME
  }

  /**
   *
   * Add templates and plugins
   *
   */

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join(MODULE_NAME, 'plugin.js'),
    options,
    ssr: true
  })

  // Utils
  this.addTemplate({
    src: path.resolve(__dirname, 'templates/Rgpd.vue'),
    fileName: path.join(MODULE_NAME, 'Rgpd.vue'),
    options
  })
}
