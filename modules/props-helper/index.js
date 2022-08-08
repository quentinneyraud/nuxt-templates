import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'props-helper'

const DEFAULT_OPTIONS = {
  componentsDirectorySubdirectories: []
}

export default function (moduleOptions) {
  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], this.options.propsHelper, DEFAULT_OPTIONS),
    MODULE_NAME
  }

  if (!options.componentsDirectorySubdirectories.includes('')) options.componentsDirectorySubdirectories.push('')

  this.options.alias.PropsTypes = path.resolve(__dirname, './scripts/nuxt-prop-types.js')

  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })
}
