import path from 'path'

const MODULE_NAME = 'props-helper'

export default function () {
  this.options.alias.PropsTypes = path.resolve(__dirname, './scripts/nuxt-prop-types.js')

  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    ssr: true
  })
}
