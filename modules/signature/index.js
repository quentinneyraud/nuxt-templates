import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'signature'

const DEFAULT_OPTIONS = {
  name: null,
  website: null,
  twitter: null,
  facebook: null,
  team: [],
  libraries: [],
  fonts: [],
  icons: [],
  force: false
}

export default function (moduleOptions) {
  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], DEFAULT_OPTIONS),
    MODULE_NAME
  }

  if (this.options.dev && !options.force) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  // Script
  this.addPlugin({
    src: path.resolve(__dirname, 'scripts/index.js'),
    fileName: path.join(MODULE_NAME, 'index.js'),
    options,
    ssr: false
  })
}
