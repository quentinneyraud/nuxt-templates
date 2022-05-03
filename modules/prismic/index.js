import path from 'path'

const MODULE_NAME = 'prismic'

export default function () {
  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/richTextLinks.js'),
    fileName: path.join(MODULE_NAME, 'plugins/richTextLinks.js'),
    ssr: false
  })
}
