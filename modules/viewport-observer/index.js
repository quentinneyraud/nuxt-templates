import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'viewport-observer'

export default function (moduleOptions) {
  const DEFAULT_OPTIONS = {
    helper: this.options.dev,
    directiveOptions: {
      autoOffset: false,
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
    src: path.resolve(__dirname, 'directives/index.js'),
    fileName: path.join(MODULE_NAME, 'directives/index.js'),
    options,
    ssr: false
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/helper.js'),
    fileName: path.join(MODULE_NAME, 'plugins/helper.js'),
    options,
    ssr: false
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/state.js'),
    fileName: path.join(MODULE_NAME, 'plugins/state.js'),
    options,
    ssr: false
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'Observer.js'),
    fileName: path.join(MODULE_NAME, 'Observer.js'),
    options,
    ssr: false
  })
}
