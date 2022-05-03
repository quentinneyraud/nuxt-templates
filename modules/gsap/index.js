import path from 'path'

const MODULE_NAME = 'gsap'

export default function () {
  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    ssr: false
  })
}
