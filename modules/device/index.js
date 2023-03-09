import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'device'

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
    ...defu(moduleOptions, this.options[MODULE_NAME], DEFAULT_OPTIONS),
    MODULE_NAME
  }

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })
}
