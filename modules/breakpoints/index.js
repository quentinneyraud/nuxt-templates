import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'breakpoints'

const DEFAULT_OPTIONS = {
  defaultwindowWidth: 1440,
  breakpoints: {
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200,
    xxlarge: 1440,
    xxxlarge: 1920
  }
}

export default function (moduleOptions) {
  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], this.options.breakpoints, DEFAULT_OPTIONS),
    MODULE_NAME
  }

  // Directive
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })
}
