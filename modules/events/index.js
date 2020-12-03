import path from 'path'

const ROOT_DIR = 'events'

export default function () {
  const options = this.options.events || []

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
