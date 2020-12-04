import path from 'path'
import { DEFAULT_CONFIG } from './config'

const ROOT_DIR = 'viewport-observer'

export default function (moduleOptions) {
  const options = this.options.viewportObserver || moduleOptions || {}

  // Merge user default config in module default config
  options.defaultConfig = {
    ...DEFAULT_CONFIG,
    ...options.defaultConfig
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join(ROOT_DIR, 'plugin.js'),
    options,
    ssr: false
  })
}
