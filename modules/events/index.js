import path from 'path'

const ROOT_DIR = 'events'

const isModuleInstalled = moduleName => {
  let path

  try {
    path = require.resolve(moduleName)
  } catch (_) {}

  return path
}

export default function (moduleOptions) {
  const options = this.options.events || moduleOptions || {}

  options.isGsapInstalled = isModuleInstalled('gsap')

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join(ROOT_DIR, 'plugin.js'),
    options,
    ssr: false
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/utils.js'),
    fileName: path.join(ROOT_DIR, 'utils.js')
  })
}
