import path from 'path'

const MODULE_NAME = 'signature'

const DEFAULT_OPTIONS = {
  name: '',
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
  let options = this.options.signature || moduleOptions || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    MODULE_NAME
  }

  const isDev = this.options.dev

  if (isDev && !options.force) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️ [${MODULE_NAME}]: Module not enabled`)
    return
  }

  // Script
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/index.js'),
    fileName: path.join(MODULE_NAME, 'index.js'),
    options,
    ssr: false
  })
}
