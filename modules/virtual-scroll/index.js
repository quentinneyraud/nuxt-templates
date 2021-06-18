import path from 'path'

const MODULE_NAME = 'virtual-scroll'
const DEFAULT_OPTIONS = {}

export default function (moduleOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options[MODULE_NAME],
    ...this.options.virtualScroll,
    ...moduleOptions,
    MODULE_NAME
  }

  // Plugins
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'index.js'),
    options,
    ssr: false
  })

  /**
   *
   * Directives
   *
   */
  this.addPlugin({
    src: path.resolve(__dirname, 'directives/section.js'),
    fileName: path.join(MODULE_NAME, 'directives/section.js'),
    options,
    ssr: false
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'directives/container.js'),
    fileName: path.join(MODULE_NAME, 'directives/container.js'),
    options,
    ssr: false
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'directives/fixed.js'),
    fileName: path.join(MODULE_NAME, 'directives/fixed.js'),
    options,
    ssr: false
  })

  /**
   *
   * Components
   *
   */
  this.addPlugin({
    src: path.resolve(__dirname, 'components/plugin.js'),
    fileName: path.join(MODULE_NAME, 'components/plugin.js'),
    options,
    ssr: true
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'components/VirtualScrollScrollBar.vue'),
    fileName: path.join(MODULE_NAME, 'components/VirtualScrollScrollBar.vue'),
    options
  })
}
