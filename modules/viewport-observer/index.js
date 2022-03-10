import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'viewport-observer'

export default function (moduleOptions) {
  const DEFAULT_OPTIONS = {
    helper: this.options.dev,
    directiveOptions: {
      activeClass: 'in-view',
      threshold: 0,
      offset: 0,
      once: true
    }
  }

  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], this.options.viewportObserver, DEFAULT_OPTIONS),
    MODULE_NAME
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: false
  })
}
