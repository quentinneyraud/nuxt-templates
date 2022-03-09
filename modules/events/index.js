import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'events'

const DEFAULT_OPTIONS = {
  events: []
}

const isModuleInstalled = moduleName => {
  let path

  try {
    path = !!require.resolve(moduleName)
  } catch (_) {
    return false
  }

  return path
}

export default function (moduleOptions) {
  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], DEFAULT_OPTIONS),
    MODULE_NAME,
    isGsapInstalled: isModuleInstalled('gsap')
  }

  this.extendBuild(config => {
    if (!options.isGsapInstalled) {
      config.externals = {
        gsap: 'gsap'
      }
    }
  })

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: false
  })
}
