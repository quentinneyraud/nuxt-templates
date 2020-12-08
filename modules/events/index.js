import path from 'path'

const MODULE_NAME = 'events'

const DEFAULT_OPTIONS = {
  events: [],
  debug: false,
  isGsapInstalled: false
}

const isModuleInstalled = moduleName => {
  let path

  try {
    path = require.resolve(moduleName)
  } catch _ {
    return false
  }

  return path
}

export default function (moduleOptions) {
  let options = this.options.events || moduleOptions || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    MODULE_NAME,
    isGsapInstalled: isModuleInstalled('gsap')
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
}
