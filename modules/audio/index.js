import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'audio'

const DEFAULT_OPTIONS = {}

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

  this.addTemplate({
    src: path.resolve(__dirname, 'plugins/Sound.js'),
    fileName: path.join(MODULE_NAME, 'plugins/Sound.js'),
    options
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'plugins/silence.js'),
    fileName: path.join(MODULE_NAME, 'plugins/silence.js'),
    options
  })

  // Directive
  this.addPlugin({
    src: path.resolve(__dirname, 'directives/index.js'),
    fileName: path.join(MODULE_NAME, 'directives/index.js'),
    options,
    ssr: true
  })
}
